import { DATA } from "@/data/resume";
import { getAllNotes } from "@/lib/notes";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${DATA.url}/` },
    { url: `${DATA.url}/blog/` },
    ...getAllNotes().map((note) => ({ url: `${DATA.url}/blog/${note.slug}/`, lastModified: note.updated })),
  ];
}
