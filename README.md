# Zhengyang Xie · Personal Site

https://sormaker.github.io

Built on the [Magic UI Portfolio](https://github.com/magicuidesign/portfolio) template (MIT, see `LICENSE`). Next.js 16, Tailwind CSS 4, static export to GitHub Pages.

## Develop

Node.js 24 and pnpm.

```sh
pnpm install
pnpm dev
pnpm lint
pnpm build   # writes the static site to out/
```

Pushing to `main` runs `.github/workflows/pages.yml`, which builds `out/` and deploys it to GitHub Pages.

## Where things are

| What | Where |
| --- | --- |
| Profile, experience, education, projects, honors, publications | `src/data/resume.tsx` |
| Section intros (projects, honors, contact) | `src/components/section/` |
| Blog notes | `content/notes/*.md` |
| Images used by notes | `public/blog-assets/` |
| Project media, logos, avatar | `public/` |
| Share image (`/og.png`), sitemap, robots | `src/app/og.png/route.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` |

## Blog notes

Notes are copied from [Notion-Backup](https://github.com/SORMaker/Notion-Backup). Each file starts with front matter:

```md
---
title: Smart Pointers
updated: 2025-10-17
parent: rust
order: 3
source: docs/Rust-Note/Smart-Pointers.md
---
```

- `parent` puts the note under another note. Notes without a parent appear on `/blog/`; give them a `summary`.
- `order` sorts notes under the same parent.
- `source` is the file's path in Notion-Backup, used for the "Source on GitHub" link.

The file name is the URL: `content/notes/rust-smart-pointers.md` → `/blog/rust-smart-pointers/`.

## Credits

- University emblems: [SUSTech](https://www.sustech.edu.cn/en/school_logo.html), [Donghua University](https://www.dhu.edu.cn/xxbs/list.htm).
- TRON Camp logo: LimX Dynamics.
- Skill icons: [Devicon](https://github.com/devicons/devicon) (MIT, `src/components/ui/svgs/devicon-LICENSE.txt`) and [Lucide](https://lucide.dev).
