import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

const linkClass = "text-blue-500 underline-offset-4 hover:underline";

export default function ContactSection() {
  return (
    <div className="relative rounded-xl border p-10">
      <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-xl border bg-primary px-4 py-1">
        <span className="text-sm font-medium text-background">Contact</span>
      </div>
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-xl">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h2>
        <p className="mx-auto max-w-lg text-balance text-muted-foreground">
          I&apos;m looking for internships in embodied AI and VLA. If you&apos;re working on robot learning, I&apos;d
          love to hear from you.{" "}
          <a href={`mailto:${DATA.contact.email}`} className={linkClass}>
            Send me an email
          </a>{" "}
          or find my code on{" "}
          <a href={DATA.contact.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub
          </a>
          .
        </p>
      </div>
    </div>
  );
}
