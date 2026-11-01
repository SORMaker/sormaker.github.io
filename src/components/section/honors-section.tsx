import { Icons } from "@/components/icons";
import { SectionHeader } from "@/components/section/section-header";
import { Timeline, TimelineConnectItem, TimelineItem } from "@/components/timeline";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { Award, Trophy } from "lucide-react";

export default function HonorsSection() {
  return (
    <div className="flex min-h-0 w-full flex-col gap-y-8 overflow-hidden">
      <SectionHeader label="Honors" title="Honors & Awards">
        I spent most of my undergraduate years in the lab, building autonomous vehicles and embedded systems with my
        teammates for national competitions. These are the results.
      </SectionHeader>
      <Timeline>
        {DATA.honors.map((honor) => {
          const Icon = honor.competition ? Trophy : Award;
          return (
            <TimelineItem key={honor.title + honor.dates} className="flex w-full items-start justify-between gap-10">
              <TimelineConnectItem className="flex items-start justify-center">
                <div className="z-10 flex size-10 flex-none shrink-0 items-center justify-center overflow-hidden rounded-full border bg-card p-2 text-muted-foreground shadow ring-2 ring-border">
                  <Icon className="size-full" aria-hidden />
                </div>
              </TimelineConnectItem>
              <div className="flex min-w-0 flex-1 flex-col justify-start gap-2">
                <time className="text-xs text-muted-foreground">{honor.dates}</time>
                <h3 className="leading-none font-semibold">{honor.title}</h3>
                <p className="text-sm text-muted-foreground">{honor.organization}</p>
                {honor.description && (
                  <p className="text-sm leading-relaxed wrap-break-word text-muted-foreground">{honor.description}</p>
                )}
                {honor.source && (
                  <a href={honor.source} target="_blank" rel="noopener noreferrer" className="mt-1 w-fit">
                    <Badge className="flex items-center gap-1.5 bg-primary text-xs text-primary-foreground">
                      <Icons.github className="size-4" />
                      Source
                    </Badge>
                  </a>
                )}
              </div>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
}
