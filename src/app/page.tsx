/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import ContactSection from "@/components/section/contact-section";
import HonorsSection from "@/components/section/honors-section";
import ProjectsSection from "@/components/section/projects-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col gap-14">
      <section id="hero" className="flex flex-col justify-between gap-2 gap-y-6 md:flex-row">
        <div className="order-2 flex flex-col gap-2 md:order-1">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl"
            yOffset={8}
            text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
          />
          <BlurFadeText
            className="max-w-[600px] text-muted-foreground md:text-lg lg:text-xl"
            delay={BLUR_FADE_DELAY}
            text={DATA.description}
          />
        </div>
        <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
          <Avatar className="size-24 rounded-full border shadow-lg ring-4 ring-muted md:size-32">
            <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
            <AvatarFallback>{DATA.initials}</AvatarFallback>
          </Avatar>
        </BlurFade>
      </section>

      <section id="about" className="flex flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full leading-relaxed text-pretty text-muted-foreground dark:prose-invert">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </BlurFade>
      </section>

      <section id="education" className="flex flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="text-xl font-bold">Education</h2>
        </BlurFade>
        <div className="flex flex-col gap-8">
          {DATA.education.map((education, index) => (
            <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 8 + index * 0.05}>
              <a
                href={education.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-x-3"
              >
                <div className="flex min-w-0 flex-1 items-center gap-x-3">
                  <img
                    src={education.logoUrl}
                    alt=""
                    className="size-8 flex-none overflow-hidden rounded-full border object-contain p-1 shadow ring-2 ring-border md:size-10"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex items-center gap-2 leading-none font-semibold">
                      {education.school}
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 -translate-x-2 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">{education.degree}</div>
                  </div>
                </div>
                <div className="flex-none text-right text-xs text-muted-foreground tabular-nums">
                  {education.start} - {education.end}
                </div>
              </a>
            </BlurFade>
          ))}
        </div>
      </section>

      <section id="publications" className="flex flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 8.5}>
          <h2 className="text-xl font-bold">Publications</h2>
        </BlurFade>
        {DATA.publications.map((publication, index) => (
          <BlurFade key={publication.title} delay={BLUR_FADE_DELAY * 8.5 + index * 0.05}>
            <div className="flex items-start justify-between gap-x-3">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="leading-snug font-semibold">{publication.title}</div>
                <div className="text-sm text-muted-foreground [&_p]:m-0 [&_strong]:font-medium [&_strong]:text-foreground">
                  <Markdown>{publication.authors}</Markdown>
                </div>
                <div className="text-sm text-muted-foreground italic">{publication.venue}</div>
              </div>
              <div className="flex-none text-right text-xs text-muted-foreground tabular-nums">{publication.year}</div>
            </div>
          </BlurFade>
        ))}
      </section>

      <section id="projects">
        <ProjectsSection delay={BLUR_FADE_DELAY * 11} />
      </section>

      <section id="honors">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HonorsSection />
        </BlurFade>
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
