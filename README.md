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

- `src/data/resume.tsx`: profile, contact, experience, education, skills and honors.
- `src/data/projects.ts`: shared project-card and detail-page content.
- `src/data/research.ts`: research summary and manuscript information.
- `src/app/globals.css`: responsive layout and light/dark colors.

To enable a Resume button, add an approved PDF to `public/` and set `resumeUrl` in `resume.tsx`. It remains hidden when the value is null.

## Content and assets

ACT material comes from [troncamp-mani](https://github.com/SORMaker/troncamp-mani). T4 64.3/100 is a reported competition score, not a success rate. This is an ACT reproduction, not a new policy architecture.

The [bicycle repository](https://github.com/SORMaker/CH32-Bike-Overland) credits SORMaker and Jasom_Wu for software design and ErBW_s for hardware. Its competition photo and the ACT rollout video are stored locally; video loads only after Play.

Research is labeled as a research project. No publication status or public manuscript download is implied.

University emblems are from the official [SUSTech visual identity page](https://www.sustech.edu.cn/en/school_logo.html) and [Donghua University identity page](https://www.dhu.edu.cn/xxbs/list.htm). Their original colors and proportions are preserved.
