#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRootArg = process.argv[2];

if (!sourceRootArg) {
  console.error("Usage: node scripts/import-notes.mjs /path/to/Notion-Backup");
  process.exit(1);
}

const sourceRoot = path.resolve(sourceRootArg);
const sourceDocs = path.join(sourceRoot, "docs");
if (!fs.existsSync(sourceDocs) || !fs.existsSync(path.join(sourceRoot, ".git"))) {
  throw new Error(`Expected a Git repository containing docs/: ${sourceRoot}`);
}

function git(args, options = {}) {
  return execFileSync("git", ["-c", "core.quotepath=false", ...args], {
    cwd: sourceRoot,
    encoding: options.encoding ?? "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });
}

const sourceCommit = git(["rev-parse", "HEAD"]).trim();
const sourceStatus = git(["status", "--porcelain", "--untracked-files=all"]).trim();
if (sourceStatus) {
  throw new Error(`Source checkout must be clean before import:\n${sourceStatus}`);
}

const trackedPaths = new Set(
  git(["ls-tree", "-r", "--name-only", "HEAD", "--", "docs"])
    .split("\n")
    .filter(Boolean),
);
const markdownPaths = [...trackedPaths].filter((file) => file.toLowerCase().endsWith(".md"));

function readBlob(gitPath) {
  if (!trackedPaths.has(gitPath)) return undefined;
  return git(["show", `HEAD:${gitPath}`], { encoding: "buffer" });
}

function readText(gitPath) {
  const blob = readBlob(gitPath);
  return blob?.toString("utf8");
}

function latestChange(gitPath) {
  const value = git(["log", "--follow", "-1", "--format=%cI", "HEAD", "--", gitPath]).trim();
  if (!value) throw new Error(`No tracked Git history for ${gitPath}`);
  return value;
}

function firstHeading(markdown) {
  const line = markdown.split(/\r?\n/).find((item) => /^#\s+/.test(item));
  if (!line) return undefined;
  let title = line.replace(/^#\s+/, "").trim();
  title = title.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  title = title.replace(/<[^>]+>/g, "").replace(/[*_`~]/g, "").trim();
  return title || undefined;
}

const rootSpecs = [
  {
    slug: "github-workflow",
    preferred: "docs/GitHub极简工作流.md",
    titleMatch: (title) => /github/i.test(title ?? "") && /(工作流|workflow|git)/i.test(title ?? ""),
    summary: "GitHub 分支、提交、推送与 Pull Request 的操作流程，以及 SSH Key 配置。",
    kind: "article",
  },
  {
    slug: "pointers-in-c",
    preferred: "docs/Poniters-in-C.md",
    titleMatch: (title) => /pointer/i.test(title ?? "") && /c\+\+/i.test(title ?? ""),
    summary: "围绕 C/C++ 指针课程整理的学习笔记，介绍指针与内存地址。",
    kind: "article",
  },
  {
    slug: "wsl",
    preferred: "docs/WSL-Windows-Subsystem-For-Linux.md",
    titleMatch: (title) => /\bwsl\b/i.test(title ?? "") || /windows subsystem for linux/i.test(title ?? ""),
    summary: "记录 WSL 的安装、发行版管理、备份与恢复等常用命令。",
    kind: "article",
  },
  {
    slug: "linear-algebra",
    preferred: "docs/Linear-Algebra-MIT.md",
    titleMatch: (title) => /linear algebra/i.test(title ?? "") && /mit/i.test(title ?? ""),
    summary: "围绕 MIT 18.06 线性代数课程整理的讲次笔记。",
    kind: "series",
    groupDir: "docs/Linear-Algebra-MIT",
  },
  {
    slug: "rust",
    preferred: "docs/Rust-Note.md",
    titleMatch: (title) => /^rust note$/i.test(title ?? ""),
    summary: "整理 Rust 进阶主题的学习笔记，包括智能指针、并发、异步等内容。",
    kind: "series",
    groupDir: "docs/Rust-Note",
  },
  {
    slug: "ubuntu",
    preferred: "docs/Ubuntu安装指南.md",
    titleMatch: (title) => /ubuntu/i.test(title ?? "") && /(指南|guide)/i.test(title ?? ""),
    summary: "汇总 Ubuntu 的安装、卸载和常见问题处理步骤。",
    kind: "series",
    groupDir: "docs/Ubuntu安装指南",
  },
];

const excludedSpecs = [
  {
    match: (file) => /(^|\/)Linear-Algebra-MIT\/Lecture31\.md$/i.test(file),
    slug: "linear-algebra-lecture31",
    status: "draft-review",
    reason: "The source proofreading checklist marks Lecture 31 as TODO. Its source body is preserved verbatim under content/notes/drafts/ and is omitted from published posts.",
  },
  {
    match: (file) => /(^|\/)Linear-Algebra-MIT\/Lecture32\.md$/i.test(file),
    slug: "linear-algebra-lecture32",
    status: "unpublished",
    reason: "The source contains a title only, so this entry is omitted from published posts.",
  },
];

const excludedPathBySlug = new Map();
for (const spec of excludedSpecs) {
  const found = markdownPaths.find(spec.match);
  if (found) excludedPathBySlug.set(found, spec);
}

function findRootPath(spec) {
  if (trackedPaths.has(spec.preferred)) return spec.preferred;
  const candidates = markdownPaths
    .filter((file) => file.split("/").length === 2 && !/docs\/(README|XieZhengyang)\.md$/i.test(file))
    .filter((file) => spec.titleMatch(firstHeading(readText(file) ?? "")))
    .sort((a, b) => a.localeCompare(b, "en"));
  if (candidates.length !== 1) {
    throw new Error(`Could not uniquely locate ${spec.slug} source: ${candidates.join(", ") || "no candidates"}`);
  }
  return candidates[0];
}

const rootPathBySlug = new Map();
const rootSpecByPath = new Map();
for (const spec of rootSpecs) {
  const sourcePath = findRootPath(spec);
  if (rootPathBySlug.has(spec.slug)) throw new Error(`Duplicate root slug ${spec.slug}`);
  rootPathBySlug.set(spec.slug, sourcePath);
  rootSpecByPath.set(sourcePath, spec);
}

const selectedPaths = new Set(rootPathBySlug.values());
for (const spec of rootSpecs) {
  if (!spec.groupDir) continue;
  for (const file of markdownPaths) {
    if (file.startsWith(`${spec.groupDir}/`)) selectedPaths.add(file);
  }
}

const chineseSlugSuffixes = new Map([
  ["使用多线程", "using-multiple-threads"],
  ["基于Send和Sync的线程安全", "send-sync-thread-safety"],
  ["并发和并行", "concurrency-and-parallelism"],
  ["线程同步：Atomic 原子类型与内存顺序", "atomic-types-and-memory-ordering"],
  ["线程同步-Atomic原子类型与内存顺序", "atomic-types-and-memory-ordering"],
  ["线程同步：锁、Condvar、信号量", "locks-condvar-and-semaphores"],
  ["线程同步-锁、Condvar、信号量", "locks-condvar-and-semaphores"],
  ["线程间的消息传递", "message-passing-between-threads"],
  ["Future执行器与任务调度", "future-executor-and-task-scheduling"],
  ["Pin 和 Unpin", "pin-and-unpin"],
  ["async/await和Stream流处理", "async-await-and-streams"],
  ["async编程入门", "async-programming-introduction"],
  ["一些疑难问题的解决办法", "async-troubleshooting"],
  ["同时运行多个Future", "running-multiple-futures"],
  ["unsafe简介", "unsafe-introduction"],
  ["五种兵器", "five-unsafe-operations"],
  ["足下科技-RUST+LLM岗-复习", "llm-interview-review"],
  ["安装Ubuntu", "install"],
  ["卸载Ubuntu", "uninstall"],
  ["常见问题", "faq"],
]);

const rustEnglishSuffixes = new Map([
  ["Lifetime", "lifetime"],
  ["Functional Programming", "functional-programming"],
  ["Smart Pointers", "smart-pointers"],
  ["Reference Cycles and Self Reference", "reference-cycles-and-self-reference"],
  ["Fearless Concurrency", "fearless-concurrency"],
  ["Global Variables", "global-variables"],
  ["Error Handling", "error-handling"],
  ["unsafe Rust", "unsafe-rust"],
  ["async/await", "async-await"],
]);

function asciiSlug(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function entrySlug(sourcePath, title) {
  const rootSpec = rootSpecByPath.get(sourcePath);
  if (rootSpec) return rootSpec.slug;
  if (sourcePath.startsWith("docs/Linear-Algebra-MIT/")) {
    const lecture = path.posix.basename(sourcePath).match(/^Lecture(\d+)\.md$/i);
    if (!lecture) throw new Error(`Unmapped linear-algebra source path: ${sourcePath}`);
    return `linear-algebra-lecture${lecture[1].padStart(2, "0")}`;
  }
  if (sourcePath.startsWith("docs/Ubuntu安装指南/")) {
    const suffix = chineseSlugSuffixes.get(title ?? "");
    if (!suffix) throw new Error(`Unmapped Ubuntu chapter title: ${title} (${sourcePath})`);
    return `ubuntu-${suffix}`;
  }
  if (sourcePath.startsWith("docs/Rust-Note/")) {
    const inner = sourcePath.slice("docs/Rust-Note/".length);
    const parentDir = path.posix.dirname(inner);
    const isNested = parentDir !== ".";
    let suffix = chineseSlugSuffixes.get(title ?? "");
    if (!suffix && !isNested) suffix = rustEnglishSuffixes.get(title ?? "");
    if (!suffix) suffix = asciiSlug(title ?? path.posix.basename(inner, ".md"));
    if (!suffix) throw new Error(`Unmapped non-ASCII Rust title: ${title} (${sourcePath})`);
    if (!isNested && suffix.startsWith("rust-")) suffix = suffix.slice("rust-".length);
    const parentPrefix = isNested
      ? `rust-${asciiSlug(path.posix.basename(parentDir))}`
      : "rust";
    return `${parentPrefix}-${suffix}`;
  }
  throw new Error(`No slug rule for ${sourcePath}`);
}

function languageOf(markdown, title) {
  const sample = `${title ?? ""}\n${markdown.slice(0, 12000)}`;
  return (sample.match(/\p{Script=Han}/gu) ?? []).length >= 3 ? "zh-CN" : "en";
}

const docs = [];
for (const sourcePath of selectedPaths) {
  if (excludedPathBySlug.has(sourcePath)) continue;
  const markdown = readText(sourcePath);
  if (markdown === undefined) throw new Error(`Selected source is not in HEAD: ${sourcePath}`);
  const spec = rootSpecByPath.get(sourcePath);
  const title = firstHeading(markdown) ?? path.posix.basename(sourcePath, ".md");
  const slug = entrySlug(sourcePath, title);
  const post = {
    slug,
    title,
    summary: spec?.summary ?? title,
    sourcePath,
    updatedAt: latestChange(sourcePath),
    kind: spec?.kind ?? "article",
    order: spec ? rootSpecs.indexOf(spec) : 0,
    lang: languageOf(markdown, title),
    _markdown: markdown,
    _root: spec?.slug,
    _groupDir: spec?.groupDir,
  };
  if (spec?.kind === "series") post.series = undefined;
  docs.push(post);
}

const slugSeen = new Map();
for (const post of docs) {
  if (slugSeen.has(post.slug)) {
    throw new Error(`Slug collision: ${post.slug} for ${slugSeen.get(post.slug)} and ${post.sourcePath}`);
  }
  slugSeen.set(post.slug, post.sourcePath);
}

const postBySourcePath = new Map(docs.map((post) => [post.sourcePath, post]));
const rootByGroupDir = new Map(
  docs.filter((post) => post._groupDir).map((post) => [post._groupDir, post]),
);

function indexPostFor(file) {
  const groupDir = [...rootByGroupDir.keys()].find((dir) => file.startsWith(`${dir}/`));
  if (!groupDir) return undefined;
  const inner = file.slice(`${groupDir}/`.length);
  const dirName = path.posix.dirname(inner);
  if (dirName === ".") return rootByGroupDir.get(groupDir);
  const folder = path.posix.basename(dirName);
  const candidate = path.posix.join(path.posix.dirname(file), "..", `${folder}.md`);
  const normalized = path.posix.normalize(candidate);
  return postBySourcePath.get(normalized) ?? rootByGroupDir.get(groupDir);
}

for (const post of docs) {
  if (post._root) {
    post.order = rootSpecs.indexOf(rootSpecByPath.get(post.sourcePath));
    continue;
  }
  const root = [...rootByGroupDir.entries()].find(([dir]) => post.sourcePath.startsWith(`${dir}/`))?.[1];
  if (!root) continue;
  post.series = root.slug;
  const index = indexPostFor(post.sourcePath);
  post.parent = index?.slug ?? root.slug;
}

function decodePath(value) {
  const unescaped = value.replace(/\\([\\ ()])/g, "$1");
  try {
    return decodeURIComponent(unescaped);
  } catch {
    return unescaped;
  }
}

function splitSuffix(value) {
  const index = value.search(/[?#]/);
  return index < 0 ? [value, ""] : [value.slice(0, index), value.slice(index)];
}

function resolveLocalPath(sourcePath, urlPath) {
  const decoded = decodePath(urlPath).replace(/\\/g, "/");
  if (decoded.startsWith("docs/")) return path.posix.normalize(decoded);
  return path.posix.normalize(path.posix.join(path.posix.dirname(sourcePath.slice("docs/".length)), decoded));
}

function encodeAssetPath(relativePath) {
  return `/blog-assets/notion-backup/${relativePath
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

const assetSubtree = path.join(repoRoot, "public", "blog-assets", "notion-backup");
const copiedAssets = new Set();
const missingAssets = [];
const brokenLinks = [];
const disabledLinks = [];
const knownAssetAliases = new Map([
  [
    "docs/.assert/Linear-Algebra-MIT/Lecture1/image1.png",
    "docs/.assert/Linear-Algebra-MIT/Lecture01/image1.png",
  ],
  [
    "docs/.assert/Linear-Algebra-MIT/Lecture1/image2.png",
    "docs/.assert/Linear-Algebra-MIT/Lecture01/image2.png",
  ],
  [
    "docs/Rust-Note/Reference Cycles and Self Reference 1d4b9c07c31280dbbb1fc54de4952be3/v2-2dbfc981f05019bf70bf81c93f956c35_1440w.png",
    "docs/.assert/Reference Cycles and Self Reference/v2-2dbfc981f05019bf70bf81c93f956c35_1440w.png",
  ],
]);

function normalizeTitle(value) {
  return value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
}

function findPostByLinkedTitle(urlPath) {
  const decoded = decodePath(urlPath);
  let linkedTitle = path.posix.basename(decoded).replace(/\.md$/i, "");
  linkedTitle = linkedTitle.replace(/\s+[0-9a-f]{32}$/i, "").trim();
  if (!linkedTitle) return undefined;
  const normalized = normalizeTitle(linkedTitle);
  const matches = docs.filter((post) => normalizeTitle(post.title) === normalized);
  return matches.length === 1 ? matches[0] : undefined;
}

function rewriteTarget(sourcePath, rawUrl, label) {
  const [urlPath, suffix] = splitSuffix(rawUrl);
  if (!urlPath || /^([a-z][a-z\d+.-]*:|\/\/)/i.test(urlPath) || urlPath.startsWith("/")) {
    return { action: "keep", url: rawUrl };
  }

  const resolved = resolveLocalPath(sourcePath, urlPath);
  if (/\.md$/i.test(resolved)) {
    const sourceDoc = resolved.startsWith("docs/") ? resolved : `docs/${resolved}`;
    const targetPost = postBySourcePath.get(sourceDoc) ?? findPostByLinkedTitle(urlPath);
    if (targetPost) return { action: "keep", url: `/blog/${targetPost.slug}/${suffix}` };
    const excluded = excludedPathBySlug.get(sourceDoc);
    if (excluded) {
      disabledLinks.push({ sourcePath, target: rawUrl, label, reason: excluded.status });
      return { action: "plain" };
    }
    brokenLinks.push({ sourcePath, target: rawUrl, resolved: sourceDoc });
    return { action: "plain" };
  }

  const assetRelative = resolved.startsWith("docs/.assert/")
    ? resolved.slice("docs/.assert/".length)
    : resolved.startsWith(".assert/")
      ? resolved.slice(".assert/".length)
      : undefined;
  const requestedAssetPath = assetRelative === undefined ? undefined : `docs/.assert/${assetRelative}`;
  const resolvedSourcePath = resolved.startsWith("docs/") ? resolved : `docs/${resolved}`;
  const assetSourcePath = requestedAssetPath
    ? trackedPaths.has(requestedAssetPath)
      ? requestedAssetPath
      : knownAssetAliases.get(requestedAssetPath)
    : knownAssetAliases.get(resolvedSourcePath);
  if (assetSourcePath) {
    const blob = assetSourcePath ? readBlob(assetSourcePath) : undefined;
    if (!blob) throw new Error(`Tracked asset disappeared from source HEAD: ${assetSourcePath}`);
    const actualAssetRelative = assetSourcePath.slice("docs/.assert/".length);
    const destination = path.join(assetSubtree, ...actualAssetRelative.split("/"));
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, blob);
    copiedAssets.add(actualAssetRelative);
    return { action: "keep", url: `${encodeAssetPath(actualAssetRelative)}${suffix}` };
  }

  if (requestedAssetPath) {
    missingAssets.push({ sourcePath, target: rawUrl, resolved: requestedAssetPath });
    return { action: "keep", url: rawUrl };
  }

  if (trackedPaths.has(resolved)) {
    return { action: "keep", url: rawUrl };
  }
  return { action: "keep", url: rawUrl };
}

function backtickRanges(line) {
  const ranges = [];
  for (let index = 0; index < line.length;) {
    if (line[index] !== "`") {
      index += 1;
      continue;
    }
    let runEnd = index + 1;
    while (line[runEnd] === "`") runEnd += 1;
    const run = line.slice(index, runEnd);
    let close = runEnd;
    let found = -1;
    while ((close = line.indexOf(run, close)) >= 0) {
      const before = line[close - 1];
      const after = line[close + run.length];
      if (before !== "`" && after !== "`") {
        found = close + run.length;
        break;
      }
      close += run.length;
    }
    if (found < 0) {
      index = runEnd;
      continue;
    }
    ranges.push([index, found]);
    index = found;
  }
  return ranges;
}

function insideRange(index, ranges) {
  return ranges.some(([start, end]) => index >= start && index < end);
}

function findClosingBracket(line, openIndex) {
  let depth = 1;
  for (let index = openIndex + 1; index < line.length; index += 1) {
    if (line[index] === "\\") {
      index += 1;
      continue;
    }
    if (line[index] === "[") depth += 1;
    if (line[index] === "]" && --depth === 0) return index;
  }
  return -1;
}

function parseDestination(line, openParen) {
  let index = openParen + 1;
  while (/\s/.test(line[index] ?? "")) index += 1;
  const wrapped = line[index] === "<";
  let start;
  let end;
  if (wrapped) {
    start = index;
    index += 1;
    const contentStart = index;
    while (index < line.length && line[index] !== ">") {
      if (line[index] === "\\") index += 1;
      index += 1;
    }
    if (line[index] !== ">") return undefined;
    end = index + 1;
    return { start, end, value: line.slice(contentStart, index), wrapped };
  }
  start = index;
  let parens = 0;
  while (index < line.length) {
    const char = line[index];
    if (char === "\\") {
      index += 2;
      continue;
    }
    if (/\s/.test(char)) break;
    if (char === "(") parens += 1;
    if (char === ")") {
      if (parens === 0) break;
      parens -= 1;
    }
    index += 1;
  }
  end = index;
  return { start, end, value: line.slice(start, end), wrapped };
}

function rewriteInlineLinks(line, sourcePath) {
  const codeRanges = backtickRanges(line);
  let result = "";
  let scanIndex = 0;
  let emittedCursor = 0;
  while (scanIndex < line.length) {
    const openSquare = line.indexOf("[", scanIndex);
    if (openSquare < 0) break;
    const image = openSquare > 0 && line[openSquare - 1] === "!";
    const tokenStart = image ? openSquare - 1 : openSquare;
    if (insideRange(tokenStart, codeRanges)) {
      scanIndex = openSquare + 1;
      continue;
    }
    const closeSquare = findClosingBracket(line, openSquare);
    if (closeSquare < 0 || line[closeSquare + 1] !== "(") {
      scanIndex = openSquare + 1;
      continue;
    }
    let closeParen = closeSquare + 2;
    let depth = 1;
    while (closeParen < line.length && depth > 0) {
      if (line[closeParen] === "\\") {
        closeParen += 2;
        continue;
      }
      if (line[closeParen] === "(") depth += 1;
      if (line[closeParen] === ")") depth -= 1;
      closeParen += 1;
    }
    if (depth !== 0) {
      scanIndex = openSquare + 1;
      continue;
    }
    closeParen -= 1;
    const destination = parseDestination(line, closeSquare + 1);
    if (!destination || destination.end > closeParen) {
      scanIndex = openSquare + 1;
      continue;
    }
    const label = line.slice(openSquare + 1, closeSquare);
    const action = rewriteTarget(sourcePath, destination.value, label);
    result += line.slice(emittedCursor, tokenStart);
    if (action.action === "plain") {
      result += label;
    } else {
      const replacement = destination.wrapped ? `<${action.url}>` : action.url;
      result += line.slice(tokenStart, destination.start) + replacement;
      result += line.slice(destination.end, closeParen + 1);
    }
    emittedCursor = closeParen + 1;
    scanIndex = closeParen + 1;
  }
  return result + line.slice(emittedCursor);
}

function rewriteReferenceDefinition(line, sourcePath) {
  const match = line.match(/^(\s*\[[^\]]+\]:\s*)(<[^>]+>|\S+)(.*)$/);
  if (!match) return line;
  const wrapped = match[2].startsWith("<") && match[2].endsWith(">");
  const value = wrapped ? match[2].slice(1, -1) : match[2];
  const action = rewriteTarget(sourcePath, value, match[1]);
  if (action.action === "plain") return match[1].replace(/\s+$/, "") + match[3];
  const destination = wrapped ? `<${action.url}>` : action.url;
  return `${match[1]}${destination}${match[3]}`;
}

function removeTopHeading(markdown, sourcePath) {
  const lines = markdown.split(/\r?\n/);
  const index = lines.findIndex((line) => /^#\s+/.test(line));
  if (index < 0) return markdown;
  const headingLink = lines[index].match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
  if (
    sourcePath.startsWith("docs/Linear-Algebra-MIT/") &&
    headingLink?.[2].startsWith("https://ocw.mit.edu/")
  ) {
    lines[index] = `[课程原页](${headingLink[2]})`;
    return lines.join("\n").replace(/^\n+/, "");
  }
  lines.splice(index, 1);
  if (lines[index] === "") lines.splice(index, 1);
  return lines.join("\n").replace(/^\n+/, "");
}

function transformMarkdown(post) {
  let markdown = removeTopHeading(post._markdown, post.sourcePath).replace(/<\/?aside\s*>/gi, "");
  if (post.slug === "linear-algebra-lecture07") {
    const mermaidBlock = /```mermaid\s*\ngraph TD;\nA\["m\*n矩阵A"\] --> B\["将A消元"\];\nB --> C\["得到主元个数r \(秩\)"\];\nB --> D\["无法取得主元的列先不管，继续消元"\];\nC --> E\["剩下的\(n-r\)个自由变量赋值0\/1"\];\nE --> F\["回代求解方程组"\];\n```/;
    if (!mermaidBlock.test(markdown)) {
      throw new Error("Lecture 07 Mermaid block changed; refusing to replace an unexpected diagram.");
    }
    markdown = markdown.replace(
      mermaidBlock,
      "![消元法求解方程组的步骤](/blog-diagrams/linear-algebra-elimination.svg)",
    );
  }
  const lines = markdown.split(/\r?\n/);
  const output = [];
  let fence;
  for (const line of lines) {
    const fenceLine = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      output.push(line);
      if (fenceLine && fenceLine[1][0] === fence.char && fenceLine[1].length >= fence.length) fence = undefined;
      continue;
    }
    if (fenceLine) {
      fence = { char: fenceLine[1][0], length: fenceLine[1].length };
      output.push(line);
      continue;
    }
    output.push(rewriteReferenceDefinition(rewriteInlineLinks(line, post.sourcePath), post.sourcePath));
  }
  return output.join("\n").trimEnd() + "\n";
}

function directChildren(parent) {
  const children = docs.filter((post) => post.parent === parent.slug);
  const ordered = [];
  const seen = new Set();
  const source = parent._markdown;
  for (const line of source.split(/\r?\n/)) {
    const regex = /!?\[[^\]]*\]\((<[^>]+>|[^\s)]+)(?:\s+[^)]*)?\)/g;
    for (const match of line.matchAll(regex)) {
      const [urlPath] = splitSuffix(match[1].replace(/^<|>$/g, ""));
      if (!urlPath || /^[a-z][a-z\d+.-]*:/i.test(urlPath) || urlPath.startsWith("#")) continue;
      const resolved = resolveLocalPath(parent.sourcePath, urlPath);
      const target = postBySourcePath.get(resolved.startsWith("docs/") ? resolved : `docs/${resolved}`);
      if (target && target.parent === parent.slug && !seen.has(target.slug)) {
        ordered.push(target);
        seen.add(target.slug);
      }
    }
  }
  children
    .filter((post) => !seen.has(post.slug))
    .sort((a, b) => a.sourcePath.localeCompare(b.sourcePath, "en", { numeric: true }))
    .forEach((post) => ordered.push(post));
  return ordered;
}

const seriesRoots = docs.filter((post) => post.kind === "series");
const visitState = new Map();
let seriesOrder = 1;
function orderDescendants(post) {
  const state = visitState.get(post.slug);
  if (state === "done") return;
  if (state === "visiting") throw new Error(`Series index cycle at ${post.slug}`);
  visitState.set(post.slug, "visiting");
  for (const child of directChildren(post)) {
    if (child.kind === "series") throw new Error(`Unexpected nested series root ${child.slug}`);
    child.order = seriesOrder++;
    orderDescendants(child);
  }
  visitState.set(post.slug, "done");
}
for (const root of seriesRoots) orderDescendants(root);

const publicPosts = docs
  .map(({ _markdown, _root, _groupDir, ...post }) => post)
  .sort((a, b) => a.sourcePath.localeCompare(b.sourcePath, "en"));

const excluded = [];
for (const [sourcePath, spec] of excludedPathBySlug) {
  const markdown = readText(sourcePath) ?? "";
  const record = {
    slug: spec.slug,
    title: firstHeading(markdown) ?? path.posix.basename(sourcePath, ".md"),
    sourcePath,
    status: spec.status,
    reason: spec.reason,
  };
  excluded.push(record);
  if (spec.status === "draft-review") {
    const draftDirectory = path.join(repoRoot, "content", "notes", "drafts");
    fs.mkdirSync(draftDirectory, { recursive: true });
    fs.writeFileSync(path.join(draftDirectory, `${spec.slug}.md`), markdown);
  }
}

// The source tree and this namespaced subtree are importer-owned. Leave other public assets untouched.
fs.rmSync(assetSubtree, { recursive: true, force: true });
fs.mkdirSync(assetSubtree, { recursive: true });

// Clear only stale note files named by the previous generated manifest.
const manifestPath = path.join(repoRoot, "src", "data", "blog-manifest.json");
if (fs.existsSync(manifestPath)) {
  try {
    const previous = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    const currentSlugs = new Set(publicPosts.map((post) => post.slug));
    for (const post of previous.posts ?? []) {
      if (!currentSlugs.has(post.slug) && /^[a-z0-9-]+$/.test(post.slug)) {
        fs.rmSync(path.join(repoRoot, "content", "notes", `${post.slug}.md`), { force: true });
      }
    }
  } catch (error) {
    throw new Error(`Could not read existing blog manifest: ${error.message}`);
  }
}

for (const post of docs) {
  const notePath = path.join(repoRoot, "content", "notes", `${post.slug}.md`);
  fs.mkdirSync(path.dirname(notePath), { recursive: true });
  fs.writeFileSync(notePath, transformMarkdown(post));
}

fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(
  manifestPath,
  `${JSON.stringify({ sourceCommit, posts: publicPosts, excluded }, null, 2)}\n`,
);

console.log(
  JSON.stringify(
    {
      sourceCommit,
      posts: publicPosts.length,
      roots: publicPosts.filter((post) => !post.parent).length,
      seriesPosts: publicPosts.filter((post) => post.parent).length,
      excluded: excluded.map(({ slug, status }) => ({ slug, status })),
      copiedAssets: copiedAssets.size,
      missingAssets,
      brokenLinks,
      disabledLinks: disabledLinks.length,
      manifest: path.relative(repoRoot, manifestPath),
    },
    null,
    2,
  ),
);
