import { readFileSync } from "node:fs";
import path from "node:path";
import manifest from "@/data/blog-manifest.json";

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  sourcePath: string;
  updatedAt: string;
  kind: "article" | "series";
  series?: string;
  parent?: string;
  order: number;
  lang: "zh-CN" | "en";
};

const posts = manifest.posts as BlogPost[];

/** Return every published note in stable source-path order. */
export function getPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => a.sourcePath.localeCompare(b.sourcePath, "en") || a.slug.localeCompare(b.slug, "en"),
  );
}

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Read a published note's imported Markdown body. */
export function getPostContent(post: BlogPost): string {
  return readFileSync(path.join(process.cwd(), "content", "notes", `${post.slug}.md`), "utf8");
}

/** Return all descendants of a series root in source chapter and link order. */
export function getSeriesPosts(rootSlug: string): BlogPost[] {
  return posts
    .filter((post) => post.series === rootSlug)
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug, "en"));
}

/** Return the six top-level notes, newest source update first. */
export function getRootPosts(): BlogPost[] {
  return posts
    .filter((post) => !post.parent)
    .sort(
      (a, b) =>
        b.updatedAt.localeCompare(a.updatedAt) ||
        a.order - b.order ||
        a.slug.localeCompare(b.slug, "en"),
    );
}
