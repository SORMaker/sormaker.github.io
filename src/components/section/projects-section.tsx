import { ProjectCard } from "@/components/project-card";
import { PROJECTS } from "@/data/projects";
export default function ProjectsSection() {
  return <section id="projects" className="home-section"><div className="section-heading"><h2>Selected projects</h2><span>Learning & building</span></div><div className="project-list">{PROJECTS.map((project, index) => <ProjectCard project={project} index={index} key={project.slug} />)}</div></section>;
}
