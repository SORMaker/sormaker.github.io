import Link from "next/link";
import type { Metadata } from "next";
import { RESEARCH } from "@/data/research";
export const metadata: Metadata = { title: RESEARCH.title, description: RESEARCH.summary };
export default function ResearchPage() {
  return <main id="main" className="detail-page">
    <Link className="back-link" href="/#research">All research</Link>
    <header className="detail-header"><p className="eyebrow">{RESEARCH.status}</p><h1>{RESEARCH.title}</h1><p className="detail-lead">{RESEARCH.summary}</p><p className="research-byline">{RESEARCH.authors.join(" · ")}</p></header>
    {RESEARCH.sections.map(section => <section className="detail-section" key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}
    <section className="detail-section manuscript-reference"><h2>Manuscript</h2><p>{RESEARCH.manuscriptTitle}</p><p className="research-byline">{RESEARCH.authors.join(" and ")}</p><span className="status-label">{RESEARCH.status}</span></section>
    <Link className="back-link" href="/#research">Back to research</Link>
  </main>;
}
