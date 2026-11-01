import BlurFade from "@/components/magicui/blur-fade";
import { formatDate, getTopLevelNotes, hasChildren } from "@/lib/notes";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Study notes on Rust, linear algebra, C pointers and Linux setup.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const notes = getTopLevelNotes();

  return (
    <main className="flex flex-col gap-10">
      <header className="space-y-3">
        <BlurFade delay={0.02}>
          <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            ← Home
          </Link>
        </BlurFade>
        <BlurFade delay={0.04}>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
        </BlurFade>
        <BlurFade delay={0.06}>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Study notes, mostly in Chinese.
          </p>
        </BlurFade>
      </header>

      <ul className="divide-y border-y">
        {notes.map((note, index) => (
          <li key={note.slug} lang="zh-CN" className="py-5 sm:py-6">
            <BlurFade delay={0.08 + index * 0.04}>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <time dateTime={note.updated}>{formatDate(note.updated)}</time>
                {hasChildren(note) && (
                  <span className="rounded-full border px-2 py-0.5">Series</span>
                )}
              </div>
              <h2 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">
                <Link href={`/blog/${note.slug}/`} className="underline-offset-4 hover:underline">
                  {note.title}
                </Link>
              </h2>
              {note.summary && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note.summary}</p>
              )}
            </BlurFade>
          </li>
        ))}
      </ul>
    </main>
  );
}
