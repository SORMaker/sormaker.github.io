import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section/section-header";
import { DATA } from "@/data/resume";

export default function ProjectsSection({ delay }: { delay: number }) {
  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      <BlurFade delay={delay}>
        <SectionHeader label="My Projects" title="Things I've built">
          I started with control on microcontrollers and moved on to robot learning. Here are the projects along the
          way.
        </SectionHeader>
      </BlurFade>
      <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:auto-rows-fr sm:grid-cols-2">
        {DATA.projects.map((project, index) => (
          <BlurFade key={project.title} delay={delay + 0.04 + index * 0.05} className="h-full">
            <ProjectCard project={project} />
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
