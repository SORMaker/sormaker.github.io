import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS, getProject } from "@/data/projects";
import { ProjectVideo } from "@/components/project-video";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return PROJECTS.map(project => ({ slug: project.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <main id="main" className="detail-page">
      <Link className="back-link" href="/#projects">All projects</Link>
      <header className="detail-header">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="detail-lead">{project.detailSummary ?? project.summary}</p>
        <a className="inline-link" href={project.repository} target="_blank" rel="noreferrer">View source on GitHub</a>
      </header>
      {project.video && <ProjectVideo {...project.video} />}
      {project.image && <figure className="project-figure"><Image src={project.image.src} alt={project.image.alt} width={1600} height={1138} preload /><figcaption>Competition vehicle · 2023</figcaption></figure>}
      <section className="detail-section"><h2>The problem</h2><p>{project.problem}</p></section>
      <section className="detail-section"><h2>My contribution</h2><p>{project.role}</p>{project.limitations.map(item => <p className="scope-note" key={item}>{item}</p>)}</section>
      <section className="detail-section"><h2>Approach</h2><ol className="approach-list">{project.approach.map((item,index) => <li key={item.title}><span aria-hidden="true">{String(index+1).padStart(2,"0")}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}</ol></section>
      <section className="detail-section">
        <h2>Results</h2>
        <p className="result-line">{project.result}</p>
        {project.evidence.length > 0 && <ul className="detail-list">{project.evidence.map(item => <li key={item}>{item}</li>)}</ul>}
        <div className="evidence-links">
          <a href={project.repository + "/blob/main/README.md"} target="_blank" rel="noreferrer">Project documentation</a>
          {project.slug === "act-dual-arm-manipulation" && <a href={project.repository + "/blob/main/README_TRONCAMP.md"} target="_blank" rel="noreferrer">Competition & scoring instructions</a>}
        </div>
      </section>
      <Link className="back-link" href="/#projects">Back to projects</Link>
    </main>
  );
}
