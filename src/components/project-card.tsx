import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cover = project.video?.poster
    ? { src: project.video.poster, alt: project.video.posterAlt ?? project.title }
    : project.image;

  return (
    <article className={"project-card" + (cover ? " has-cover" : "")}>
      {cover && (
        <Link href={"/projects/" + project.slug} className="project-cover" aria-label={"View " + project.title}>
          <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 600px) calc(100vw - 82px), 248px" />
        </Link>
      )}
      <div className="project-body">
        <div className="project-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.category}</span></div>
        <h3><Link href={"/projects/" + project.slug}>{project.title}</Link></h3>
        <p className="project-summary">{project.summary}</p>
        <div className="project-facts">
          <p><span className="fact-label">My role</span>{project.role}</p>
          <p><span className="fact-label">Result</span>{project.result}</p>
        </div>
        <div className="tags">{project.tags.map(tag => <Badge variant="outline" key={tag}>{tag}</Badge>)}</div>
        <div className="project-links"><Link href={"/projects/" + project.slug}>View project</Link><a href={project.repository} target="_blank" rel="noreferrer">GitHub</a></div>
      </div>
    </article>
  );
}
