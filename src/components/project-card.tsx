/* eslint-disable @next/next/no-img-element */
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Markdown from "react-markdown";

export function ProjectCard({ project }: { project: Project }) {
  const { title, href, dates, description, technologies, image, imageAlt, imageFit, video } = project;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-200 hover:ring-2 hover:ring-muted">
      <div className="relative shrink-0">
        <a href={href} target="_blank" rel="noopener noreferrer" className="block" tabIndex={-1}>
          {video ? (
            <video src={video} poster={image} autoPlay loop muted playsInline className="h-48 w-full object-cover" />
          ) : (
            <img
              src={image}
              alt={imageAlt ?? title}
              loading="lazy"
              className={cn("h-48 w-full", imageFit === "contain" ? "bg-muted object-contain" : "object-cover")}
            />
          )}
        </a>
        <a href={href} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2">
          <Badge className="flex items-center gap-1.5 bg-black text-xs text-white hover:bg-black/90">
            <Icons.github className="size-3" />
            Source
          </Badge>
        </a>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} on GitHub`}
            className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
        <div className="prose max-w-full flex-1 text-xs leading-relaxed text-pretty text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        <div className="mt-auto flex flex-wrap gap-1">
          {technologies.map((tag) => (
            <Badge key={tag} variant="outline" className="h-6 w-fit border px-2 text-[11px] font-medium">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
