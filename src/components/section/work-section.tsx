/* eslint-disable @next/next/no-img-element */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import Markdown from "react-markdown";

const chevron = "absolute size-3.5 shrink-0 stroke-2 text-muted-foreground";

export default function WorkSection() {
  return (
    <Accordion type="single" collapsible className="grid w-full gap-6">
      {DATA.work.map((work) => (
        <AccordionItem key={work.company} value={work.company} className="grid w-full gap-2 border-b-0">
          <AccordionTrigger className="group cursor-pointer rounded-none p-0 hover:no-underline [&>svg]:hidden">
            <div className="flex w-full items-center justify-between gap-x-3 text-left">
              <div className="flex min-w-0 flex-1 items-center gap-x-3">
                <img
                  src={work.logoUrl}
                  alt=""
                  className="size-8 flex-none overflow-hidden rounded-full border object-contain p-1 shadow ring-2 ring-border md:size-10"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex items-center gap-2 leading-none font-semibold">
                    {work.company}
                    <span className="relative inline-flex size-3.5 items-center">
                      <ChevronRight
                        className={cn(
                          chevron,
                          "opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                          "group-data-[state=open]:translate-x-0 group-data-[state=open]:opacity-0",
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          chevron,
                          "opacity-0 transition-all duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:opacity-100",
                        )}
                      />
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">{work.title}</div>
                </div>
              </div>
              <div className="flex-none text-right text-xs text-muted-foreground tabular-nums">
                {work.start} - {work.end ?? "Present"}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="ml-13 p-0">
            <div className="prose max-w-full text-xs leading-relaxed text-pretty text-muted-foreground sm:text-sm dark:prose-invert prose-p:my-0 prose-ul:my-0 prose-ul:pl-4 prose-li:my-1">
              <Markdown>{work.description}</Markdown>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
