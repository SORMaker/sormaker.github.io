import BlurFade from "@/components/magicui/blur-fade";
import BlogMarkdown from "@/components/blog/markdown";
import {
  getPost,
  getPostContent,
  getPosts,
  getRootPosts,
  getSeriesPosts,
} from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

function sourceUrl(sourcePath: string) {
  const encodedPath = sourcePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `https://github.com/SORMaker/Notion-Backup/blob/main/${encodedPath}`;
}

function formatUpdatedAt(value: string, lang: BlogPost["lang"]) {
  const date = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  return new Intl.DateTimeFormat(lang === "zh-CN" ? "zh-CN" : "en", {
    year: "numeric",
    month: lang === "zh-CN" ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function localized(lang: BlogPost["lang"], english: string, chinese: string) {
  return lang === "zh-CN" ? chinese : english;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const title = post.title;
  const description = post.summary;
  const url = `/blog/${post.slug}/`;
  const image = `/og/${post.slug}.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      modifiedTime: new Date(post.updatedAt).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

function SeriesContents({
  posts,
  currentSlug,
  rootSlug,
  lang,
}: {
  posts: BlogPost[];
  currentSlug: string;
  rootSlug: string;
  lang: BlogPost["lang"];
}) {
  if (posts.length < 2 || currentSlug === rootSlug) return null;

  function nestedIndent(item: BlogPost) {
    let depth = 0;
    let parent = item.parent ? getPost(item.parent) : undefined;
    while (parent && parent.slug !== rootSlug) {
      depth += 1;
      parent = parent.parent ? getPost(parent.parent) : undefined;
    }
    return depth;
  }

  return (
    <details className="blog-toc">
      <summary>{lang === "zh-CN" ? "本系列目录" : "Contents"}</summary>
      <nav
        aria-label={lang === "zh-CN" ? "系列目录" : "Series contents"}
        className="mt-3"
      >
        <ol className="flex flex-col gap-1 border-l border-border pl-3">
          {posts.map((item) => {
            const isCurrent = item.slug === currentSlug;
            const indent = nestedIndent(item);
            return (
              <li key={item.slug}>
                {isCurrent ? (
                  <span
                    aria-current="page"
                    className="block py-1 text-sm font-medium text-foreground"
                    style={{ paddingInlineStart: `${indent * 0.9}rem` }}
                  >
                    {item.title}
                  </span>
                ) : (
                  <Link
                    href={`/blog/${item.slug}/`}
                    className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    style={{ paddingInlineStart: `${indent * 0.9}rem` }}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </details>
  );
}

function ArticleNavigation({
  previous,
  next,
  lang,
}: {
  previous?: BlogPost;
  next?: BlogPost;
  lang: BlogPost["lang"];
}) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label={lang === "zh-CN" ? "文章导航" : "Article navigation"}
      className="grid grid-cols-2 gap-4 border-t border-border pt-5"
    >
      <div>
        {previous && (
          <Link
            href={`/blog/${previous.slug}/`}
            rel="prev"
            className="group flex items-start gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden className="mt-0.5 size-4 shrink-0" />
            <span className="min-w-0">
              <span className="block text-xs">
                {localized(lang, "Previous", "上一篇")}
              </span>
              <span className="mt-1 block break-words font-medium text-foreground">
                {previous.title}
              </span>
            </span>
          </Link>
        )}
      </div>
      <div>
        {next && (
          <Link
            href={`/blog/${next.slug}/`}
            rel="next"
            className="group flex items-start justify-end gap-2 text-right text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="min-w-0">
              <span className="block text-xs">
                {localized(lang, "Next", "下一篇")}
              </span>
              <span className="mt-1 block break-words font-medium text-foreground">
                {next.title}
              </span>
            </span>
            <ArrowRight aria-hidden className="mt-0.5 size-4 shrink-0" />
          </Link>
        )}
      </div>
    </nav>
  );
}

function seriesAncestors(post: BlogPost, rootSlug: string) {
  const ancestors: BlogPost[] = [];
  let current = post.parent ? getPost(post.parent) : undefined;

  while (current && current.slug !== rootSlug) {
    ancestors.unshift(current);
    current = current.parent ? getPost(current.parent) : undefined;
  }

  return ancestors;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const content = getPostContent(post);
  const isSeriesPost = Boolean(post.series);
  const seriesRoot = isSeriesPost ? getPost(post.series!) : undefined;
  const ancestors = seriesRoot ? seriesAncestors(post, seriesRoot.slug) : [];
  const seriesPosts = isSeriesPost
    ? [seriesRoot, ...getSeriesPosts(post.series!)].filter(
        (item): item is BlogPost => Boolean(item)
      )
    : [];
  const sequence = isSeriesPost ? seriesPosts : getRootPosts();
  const index = sequence.findIndex((item) => item.slug === post.slug);
  const previous = index > 0 ? sequence[index - 1] : undefined;
  const next = index >= 0 ? sequence[index + 1] : undefined;
  const modified = new Date(post.updatedAt).toISOString();
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    dateModified: modified,
  }).replace(/</g, "\\u003c");

  return (
    <main className="blog-page blog-article flex min-w-0 flex-col gap-8">
      <header className="space-y-5">
        <BlurFade delay={0.02}>
          <nav
            aria-label={localized(post.lang, "Breadcrumb", "面包屑导航")}
            className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground"
          >
            <Link href="/blog/" className="transition-colors hover:text-foreground">
              {localized(post.lang, "Blog", "文章")}
            </Link>
            {seriesRoot && (
              <>
                <ChevronRight aria-hidden className="size-3.5 shrink-0" />
                {post.slug === seriesRoot.slug ? (
                  <span aria-current="page" className="truncate text-foreground">
                    {seriesRoot.title}
                  </span>
                ) : (
                  <Link
                    href={`/blog/${seriesRoot.slug}/`}
                    className="max-w-full truncate transition-colors hover:text-foreground"
                  >
                    {seriesRoot.title}
                  </Link>
                )}
                {ancestors.map((ancestor) => (
                  <span key={ancestor.slug} className="contents">
                    <ChevronRight aria-hidden className="size-3.5 shrink-0" />
                    <Link
                      href={`/blog/${ancestor.slug}/`}
                      className="max-w-full truncate transition-colors hover:text-foreground"
                    >
                      {ancestor.title}
                    </Link>
                  </span>
                ))}
                {post.slug !== seriesRoot.slug && (
                  <>
                    <ChevronRight aria-hidden className="size-3.5 shrink-0" />
                    <span aria-current="page" className="max-w-full truncate text-foreground">
                      {post.title}
                    </span>
                  </>
                )}
              </>
            )}
            {!seriesRoot && (
              <>
                <ChevronRight aria-hidden className="size-3.5 shrink-0" />
                <span aria-current="page" className="max-w-full truncate text-foreground">
                  {post.title}
                </span>
              </>
            )}
          </nav>
        </BlurFade>
        <BlurFade delay={0.04}>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
              {post.title}
            </h1>
            {post.summary !== post.title && (
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                {post.summary}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {localized(post.lang, "Updated", "更新于")} {formatUpdatedAt(post.updatedAt, post.lang)}
            </p>
          </div>
        </BlurFade>
        {isSeriesPost && (
          <BlurFade delay={0.06}>
            <SeriesContents
              posts={seriesPosts}
              currentSlug={post.slug}
              rootSlug={seriesRoot?.slug ?? post.slug}
              lang={post.lang}
            />
          </BlurFade>
        )}
      </header>

      <article lang={post.lang} className="blog-prose prose max-w-none min-w-0 text-pretty leading-relaxed dark:prose-invert">
        <BlogMarkdown content={content} />
      </article>

      <footer className="space-y-6">
        <a
          href={sourceUrl(post.sourcePath)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {localized(post.lang, "View source on GitHub", "在 GitHub 查看原文")}
          <span aria-hidden>↗</span>
        </a>
        <ArticleNavigation previous={previous} next={next} lang={post.lang} />
        <Link
          href="/blog/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {localized(post.lang, "Back to blog", "返回文章列表")}
        </Link>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
    </main>
  );
}
