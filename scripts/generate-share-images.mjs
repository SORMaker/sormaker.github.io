import { readFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

// PNGs are checked in, so deployment does not depend on system fonts.
// Pass a CJK-capable TTF font file when regenerating on another machine.
const fontfile = process.argv[2];
const { posts } = JSON.parse(await readFile("src/data/blog-manifest.json", "utf8"));
const out = resolve("public/og");
await mkdir(out, { recursive: true });
const escape = (s) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const avatar = await sharp("public/avatar.webp").resize(88, 88).png().toBuffer();

async function make(slug, title, label) {
  const backdrop = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#fafafa"/>
    <defs><pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#dadada"/></pattern></defs>
    <rect width="1200" height="120" fill="url(#dots)"/>
    <rect x="64" y="493" width="1072" height="1" fill="#ddd"/>
    <text x="64" y="167" font-family="sans-serif" font-size="22" fill="#777">${escape(label)}</text>
    <text x="64" y="552" font-family="sans-serif" font-size="28" fill="#222">Zhengyang Xie</text>
    <text x="1136" y="552" text-anchor="end" font-family="sans-serif" font-size="22" fill="#777">sormaker.github.io</text>
  </svg>`);
  const titleImage = await sharp({ text: {
    text: `<span foreground="#171717" weight="bold">${escape(title)}</span>`,
    font: "Arial Unicode MS 56", ...(fontfile ? { fontfile } : {}),
    width: 1010, dpi: 72, align: "left", wrap: "word-char", rgba: true,
  } }).resize({ width: 1010, height: 240, fit: "inside", withoutEnlargement: true }).png().toBuffer();
  await sharp(backdrop).composite([
    { input: titleImage, left: 64, top: 208 },
    { input: avatar, left: 1048, top: 112 },
  ]).png().toFile(resolve(out, `${slug}.png`));
}

await make("home", "Robotics & Control", "Zhengyang Xie");
await make("blog", "Blog & Notes", "Programming · Mathematics · Systems");
for (const post of posts) {
  const root = posts.find((p) => p.slug === post.series);
  await make(post.slug, post.title, root ? root.title.replace(/[^\x20-\x7E]/g, "").trim() || "Study Notes" : "Blog & Notes");
}
console.log(`Generated ${posts.length + 2} share images.`);
