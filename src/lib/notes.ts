import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

// Notes are Markdown files in content/notes, exported from
// github.com/SORMaker/Notion-Backup. Each file starts with a front matter
// block of `key: value` lines; `parent` nests a note under another note.

export type Note = {
  slug: string;
  title: string;
  summary?: string;
  updated: string;
  parent?: string;
  order: number;
  source: string;
  body: string;
};

const NOTES_DIR = path.join(process.cwd(), "content", "notes");
const SOURCE_REPO = "https://github.com/SORMaker/Notion-Backup/blob/main";

function parse(slug: string, file: string): Note {
  const match = file.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`content/notes/${slug}.md has no front matter`);

  const fields: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(": ");
    if (colon > 0) fields[line.slice(0, colon)] = line.slice(colon + 2).trim();
  }

  return {
    slug,
    title: fields.title,
    summary: fields.summary,
    updated: fields.updated,
    parent: fields.parent,
    order: Number(fields.order),
    source: fields.source,
    body: file.slice(match[0].length),
  };
}

const notes = new Map(
  readdirSync(NOTES_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const slug = name.slice(0, -3);
      return [slug, parse(slug, readFileSync(path.join(NOTES_DIR, name), "utf8"))];
    }),
);

const byOrder = (a: Note, b: Note) => a.order - b.order;

export function getNote(slug: string) {
  return notes.get(slug);
}

export function getAllNotes() {
  return [...notes.values()];
}

/** Top-level notes and series, most recently updated first. */
export function getTopLevelNotes() {
  return getAllNotes()
    .filter((note) => !note.parent)
    .sort((a, b) => b.updated.localeCompare(a.updated) || byOrder(a, b));
}

function getChildren(slug: string) {
  return getAllNotes()
    .filter((note) => note.parent === slug)
    .sort(byOrder);
}

/** Parents of a note, from the top-level note down. */
export function getAncestors(note: Note) {
  const ancestors: Note[] = [];
  for (let p = note.parent && notes.get(note.parent); p; p = p.parent && notes.get(p.parent)) {
    ancestors.unshift(p);
  }
  return ancestors;
}

/** Every note in a series in reading order, with its nesting depth. */
export function getSeries(root: Note) {
  const walk = (note: Note, depth: number): { note: Note; depth: number }[] => [
    { note, depth },
    ...getChildren(note.slug).flatMap((child) => walk(child, depth + 1)),
  ];
  return walk(root, 0);
}

export function hasChildren(note: Note) {
  return getAllNotes().some((other) => other.parent === note.slug);
}

export function sourceUrl(note: Note) {
  return `${SOURCE_REPO}/${note.source.split("/").map(encodeURIComponent).join("/")}`;
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
