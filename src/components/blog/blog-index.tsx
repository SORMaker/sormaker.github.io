import BlurFade from "@/components/magicui/blur-fade";
import type { BlogPost } from "@/lib/blog";
import Link from "next/link";

const PAGE_SIZE = 5;

function formatUpdatedAt(value: string, lang: BlogPost["lang"]) {
  const date = new Date(`${value.slice(0, 10)}T00:00:00Z`);
  const formatted = new Intl.DateTimeFormat(lang === "zh-CN" ? "zh-CN" : "en", {
    year: "numeric",
    month: lang === "zh-CN" ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);

  return lang === "zh-CN" ? `更新于 ${formatted}` : `Updated ${formatted}`;
}

function pageHref(page: number) {
  return page === 1 ? "/blog/" : `/blog/page/${page}/`;
}

export default function BlogIndex({
  posts,
  page,
  totalPages,
}: {
  posts: BlogPost[];
  page: number;
  totalPages: number;
}) {
  return (
    <main className="blog-page flex flex-col gap-10">
      <header className="space-y-3">
        <BlurFade delay={0.02}>
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Home
          </Link>
        </BlurFade>
        <BlurFade delay={0.04}>
          <div className="flex items-baseline justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Blog
            </h1>
            {totalPages > 1 && (
              <p className="text-xs tabular-nums text-muted-foreground">
                {page} / {totalPages}
              </p>
            )}
          </div>
        </BlurFade>
        <BlurFade delay={0.06}>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Notes, guides, and study materials.
          </p>
        </BlurFade>
      </header>

      <section aria-label="Blog posts" className="divide-y divide-border border-y border-border">
        {posts.map((post, index) => (
          <BlurFade key={post.slug} delay={0.08 + index * 0.035}>
            <article lang={post.lang} className="flex gap-4 py-5 sm:py-6">
              <span
                aria-hidden
                className="mt-0.5 w-7 shrink-0 font-mono text-xs tabular-nums text-muted-foreground/70"
              >
                {String((page - 1) * PAGE_SIZE + index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <time dateTime={post.updatedAt}>
                    {formatUpdatedAt(post.updatedAt, post.lang)}
                  </time>
                  {post.kind === "series" && (
                    <span className="rounded-full border border-border px-2 py-0.5">
                      {post.lang === "zh-CN" ? "系列" : "Series"}
                    </span>
                  )}
                </div>
                <h2 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="decoration-muted-foreground/50 underline-offset-4 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {post.summary}
                </p>
              </div>
            </article>
          </BlurFade>
        ))}
      </section>

      {totalPages > 1 && (
        <nav aria-label="Blog pagination" className="flex items-center justify-between gap-4">
          <div className="min-w-20">
            {page > 1 && (
              <Link
                href={pageHref(page - 1)}
                rel="prev"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Previous
              </Link>
            )}
          </div>
          <ol className="flex items-center gap-1" aria-label="Page numbers">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <li key={number}>
                <Link
                  href={pageHref(number)}
                  aria-current={number === page ? "page" : undefined}
                  className={`flex size-8 items-center justify-center rounded-md text-sm tabular-nums transition-colors ${
                    number === page
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {number}
                </Link>
              </li>
            ))}
          </ol>
          <div className="min-w-20 text-right">
            {page < totalPages && (
              <Link
                href={pageHref(page + 1)}
                rel="next"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Next →
              </Link>
            )}
          </div>
        </nav>
      )}
    </main>
  );
}
