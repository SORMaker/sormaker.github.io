import "katex/dist/katex.min.css";
import BlurFade from "@/components/magicui/blur-fade";
import NoteBody from "@/components/notes/note-body";
import {
  formatDate,
  getAllNotes,
  getAncestors,
  getNote,
  getSeries,
  getTopLevelNotes,
  sourceUrl,
  type Note,
} from "@/lib/notes";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return {};
  const root = getAncestors(note)[0];
  return {
    title: note.title,
    description: note.summary ?? (root ? `${root.title} · ${note.title}` : note.title),
    alternates: { canonical: `/blog/${note.slug}/` },
    openGraph: { type: "article", modifiedTime: note.updated, images: "/og.png" },
  };
}

const href = (note: Note) => `/blog/${note.slug}/`;

export default async function NotePage({ params }: Props) {
  const note = getNote((await params).slug);
  if (!note) notFound();

  const ancestors = getAncestors(note);
  const root = ancestors[0] ?? note;
  const series = getSeries(root);
  // Inside a series, previous/next follow the series order; otherwise they
  // move between top-level notes.
  const sequence = series.length > 1 ? series.map((item) => item.note) : getTopLevelNotes();
  const index = sequence.indexOf(note);
  const previous = sequence[index - 1];
  const next = sequence[index + 1];
  const crumbs = [
    { title: "Blog", href: "/blog/" },
    ...ancestors.map((ancestor) => ({ title: ancestor.title, href: href(ancestor) })),
  ];

  return (
    <main className="flex min-w-0 flex-col gap-8">
      <header className="space-y-5">
        <BlurFade delay={0.02}>
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
            {crumbs.map((crumb) => (
              <span key={crumb.href} className="contents">
                <Link href={crumb.href} className="max-w-full truncate transition-colors hover:text-foreground">
                  {crumb.title}
                </Link>
                <ChevronRight aria-hidden className="size-3.5 shrink-0" />
              </span>
            ))}
            <span aria-current="page" className="max-w-full truncate text-foreground">
              {note.title}
            </span>
          </nav>
        </BlurFade>
        <BlurFade delay={0.04}>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
              {note.title}
            </h1>
            {note.summary && <p className="text-base leading-relaxed text-muted-foreground">{note.summary}</p>}
            <p className="text-xs text-muted-foreground">
              Updated <time dateTime={note.updated}>{formatDate(note.updated)}</time>
            </p>
          </div>
        </BlurFade>
        {series.length > 1 && note !== root && (
          <BlurFade delay={0.06}>
            <details className="w-fit max-w-full rounded-lg border bg-muted/20 px-3 py-2 text-sm">
              <summary className="cursor-pointer select-none font-medium text-muted-foreground hover:text-foreground">
                {root.title}
              </summary>
              <ol className="mt-3 flex flex-col gap-1 border-l pl-3">
                {series.slice(1).map(({ note: item, depth }) => (
                  <li key={item.slug} style={{ paddingInlineStart: `${(depth - 1) * 0.9}rem` }}>
                    {item === note ? (
                      <span aria-current="page" className="block py-1 font-medium text-foreground">
                        {item.title}
                      </span>
                    ) : (
                      <Link href={href(item)} className="block py-1 text-muted-foreground transition-colors hover:text-foreground">
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </details>
          </BlurFade>
        )}
      </header>

      <article lang="zh-CN" className="note-prose prose max-w-none min-w-0 text-pretty leading-relaxed dark:prose-invert">
        <NoteBody markdown={note.body} />
      </article>

      <footer className="space-y-6">
        <a
          href={sourceUrl(note)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Source on GitHub ↗
        </a>
        {(previous || next) && (
          <nav aria-label="Previous and next notes" className="grid grid-cols-2 gap-4 border-t pt-5 text-sm">
            <div>
              {previous && (
                <Link href={href(previous)} rel="prev" className="flex items-start gap-2 text-muted-foreground transition-colors hover:text-foreground">
                  <ArrowLeft aria-hidden className="mt-0.5 size-4 shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-xs">Previous</span>
                    <span className="mt-1 block font-medium text-foreground">{previous.title}</span>
                  </span>
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link href={href(next)} rel="next" className="flex items-start justify-end gap-2 text-right text-muted-foreground transition-colors hover:text-foreground">
                  <span className="min-w-0">
                    <span className="block text-xs">Next</span>
                    <span className="mt-1 block font-medium text-foreground">{next.title}</span>
                  </span>
                  <ArrowRight aria-hidden className="mt-0.5 size-4 shrink-0" />
                </Link>
              )}
            </div>
          </nav>
        )}
      </footer>
    </main>
  );
}
