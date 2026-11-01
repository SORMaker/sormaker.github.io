import { Icons } from "@/components/icons";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import type { ComponentType, ReactNode } from "react";

const iconClass =
  "size-full cursor-pointer rounded-3xl border bg-background p-0 text-muted-foreground backdrop-blur-3xl transition-colors hover:bg-muted hover:text-foreground";

function DockItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={8}
        className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
      >
        <p>{label}</p>
        <TooltipArrow className="fill-primary" />
      </TooltipContent>
    </Tooltip>
  );
}

type NavLink = { href: string; icon: ComponentType<{ className?: string }>; label: string };

function NavLinkItem({ href, icon: Icon, label }: NavLink) {
  const external = href.startsWith("http");
  return (
    <DockItem label={label}>
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
        <DockIcon className={iconClass}>
          <Icon className="size-full" />
        </DockIcon>
      </a>
    </DockItem>
  );
}

const social: NavLink[] = [
  { href: DATA.contact.github, icon: Icons.github, label: "GitHub" },
  { href: `mailto:${DATA.contact.email}`, icon: Icons.email, label: "Email" },
];

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30">
      <Dock className="pointer-events-auto relative z-50 mx-auto flex h-14 w-fit gap-2 border bg-card/90 p-2 shadow-[0_0_10px_3px] shadow-primary/5 backdrop-blur-3xl">
        {DATA.navbar.map((link) => (
          <NavLinkItem key={link.label} {...link} />
        ))}
        <Separator orientation="vertical" className="m-auto h-2/3 w-px bg-border" />
        {social.map((link) => (
          <NavLinkItem key={link.label} {...link} />
        ))}
        <Separator orientation="vertical" className="m-auto h-2/3 w-px bg-border" />
        <DockItem label="Theme">
          <DockIcon className={iconClass}>
            <ModeToggle className="size-full cursor-pointer" />
          </DockIcon>
        </DockItem>
      </Dock>
    </div>
  );
}
