import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { DATA } from "@/data/resume";
export default function Navbar() {
  return <header className="site-header"><Link href="/" className="site-name" aria-label="Zhengyang Xie home">ZX<span className="brand-dot">.</span></Link><nav aria-label="Main navigation"><Link href="/#projects">Projects</Link><Link href="/#research">Research</Link>{DATA.resumeUrl && <a href={DATA.resumeUrl}>Resume</a>}<Link href="/#contact">Contact</Link></nav><ModeToggle /></header>;
}
