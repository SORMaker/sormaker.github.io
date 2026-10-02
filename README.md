# Zhengyang Xie · Robotics & Control

Personal portfolio: https://sormaker.github.io

Adapted from [Magic UI Portfolio](https://github.com/magicuidesign/portfolio), with the original MIT license and Dillion Verma copyright retained in LICENSE.

## Develop

Use Node.js 24 and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1 --port 4318
```

## Build and deploy

```sh
pnpm lint
pnpm build
```

Next.js exports the site to `out/`. Pushing to `main` runs `.github/workflows/pages.yml`, which builds and deploys this directory to GitHub Pages. The repository's Pages publishing source must be GitHub Actions.

## Update content

The layout, animations and components follow the original Magic UI Portfolio template. Only the content was changed.

- `src/data/resume.tsx`: profile, about, skills, research & experience, education, projects, honors and contact.
- `src/components/section/*.tsx`: section headings and intro text (projects, honors, contact).
- `public/`: avatar, project images/video and university logos.

## Blog

Articles and series are imported from [Notion-Backup](https://github.com/SORMaker/Notion-Backup). The checked-in Markdown and assets make the site independent of Notion at runtime.

```sh
node scripts/import-notes.mjs /Users/sorx/Notion-Backup
node scripts/generate-share-images.mjs '/System/Library/Fonts/Supplemental/Arial Unicode.ttf'
pnpm lint
pnpm build
```

`src/data/blog-manifest.json` records source paths, the source commit, and update dates from Git. `content/notes/` contains the imported text; `public/blog-assets/` and `public/og/` contain local media and share images. The image command accepts a CJK-capable TTF font path; PNGs are committed and need no system font on GitHub Actions. The importer omits the old homepage, repository checklist, and the two unfinished linear algebra entries (Lectures 31 and 32).

Blog lists use static pagination paths so direct links also work on GitHub Pages.

## Content and assets

ACT material comes from [troncamp-mani](https://github.com/SORMaker/troncamp-mani). T4 64.3/100 is a reported competition score, not a success rate. This is an ACT reproduction, not a new policy architecture.

The Laser Target Tracking System animation is copied from [2023NUEDC's system overview](https://github.com/SORMaker/2023NUEDC/blob/f3032291f13c001c31809e6b0aaba4a1194269bd/assets/system-overview.gif). It illustrates the source architecture and a tracking model with assumed actuator dynamics; it is not recorded hardware footage. The card displays the complete diagram without cropping.

The VLN card uses the [published navigation replay](https://github.com/SORMaker/VLN/blob/dcda0da3a1cdd4b1b069386866578308d796233c/assets/homepage/README.md) from a Seq2Seq baseline run. Its caption distinguishes this selected successful validation episode from the LLM-agent experiment described in the project text. The GIF is copied unchanged and displayed without cropping.

The [bicycle repository](https://github.com/SORMaker/CH32-Bike-Overland) credits SORMaker and Jasom_Wu for software design and ErBW_s for hardware. Its competition photo and the ACT rollout video are stored locally; the video autoplays muted in its project card, as in the template.

Research is labeled as a research project. No publication status or public manuscript download is implied.

University emblems are from the official [SUSTech visual identity page](https://www.sustech.edu.cn/en/school_logo.html) and [Donghua University identity page](https://www.dhu.edu.cn/xxbs/list.htm). Their original colors and proportions are preserved.

The TRON Camp logo uses the standalone LimX Dynamics mark from the company's [official icon assets](https://www.limxdynamics.com/iconfont/iconfont.js?v=c30ed1043a), with a white background for contrast in both themes.

C++, PyTorch, ROS, MATLAB, and Git skill logos come from [Devicon](https://github.com/devicons/devicon); its MIT notice is included alongside the SVG components. The other skill symbols use Lucide.
