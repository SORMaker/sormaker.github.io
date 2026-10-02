import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { RESEARCH } from "@/data/research";
import { Button } from "@/components/ui/button";
import ProjectsSection from "@/components/section/projects-section";

export default function Page() {
  return <main id="main">
    <section className="hero" aria-labelledby="name">
      <div className="hero-heading"><div><p className="eyebrow">Robotics & control</p><h1 id="name">{DATA.name}</h1></div><Image unoptimized priority src={DATA.avatarUrl} width={96} height={96} alt="Zhengyang's illustrated dog avatar" className="avatar" /></div>
      <p className="hero-description">{DATA.description}</p><p className="hero-summary">{DATA.summary}</p>
      <div className="hero-actions"><Button asChild><a href="#projects">View projects</a></Button>{DATA.resumeUrl && <Button asChild variant="outline"><a href={DATA.resumeUrl}>Resume</a></Button>}<Button asChild variant="outline"><a href={DATA.contact.github} target="_blank" rel="noreferrer">GitHub</a></Button></div>
    </section>
    <ProjectsSection />
    <section id="research" className="home-section"><div className="section-heading"><h2>Research</h2><span>Adaptive estimation</span></div><article className="research-card"><p className="eyebrow">{RESEARCH.status}</p><h3><Link href={"/research/" + RESEARCH.slug}>{RESEARCH.title}</Link></h3><p>{RESEARCH.summary}</p><p className="research-authors">{RESEARCH.authors.join(" · ")}</p><Link className="inline-link" href={"/research/" + RESEARCH.slug}>Read research summary</Link></article></section>
    <section id="experience" className="home-section"><div className="section-heading"><h2>Relevant experience</h2></div>{DATA.experience.map(item => <article className="experience" key={item.title}><div className="row-heading"><h3>{item.title}</h3><span className="date">{item.date}</span></div><p className="experience-meta">{item.organization}</p><p>{item.description}</p><p className="experience-result">{item.result}</p></article>)}</section>
    <section id="education" className="home-section"><div className="section-heading"><h2>Education</h2></div><div className="education-list">{DATA.education.map(item => <article className="education-row" key={item.school}><Image unoptimized src={item.logoUrl} alt="" width={52} height={52} className="school-logo" /><div className="school-content"><div className="row-heading"><h3>{item.school}</h3><span className="date">{item.date}</span></div><p>{item.degree}</p></div></article>)}</div></section>
    <section id="skills" className="home-section"><div className="section-heading"><h2>Skills & methods</h2></div><div className="skill-groups">{DATA.skills.map(group => <div className="skill-group" key={group.category}><h3>{group.category}</h3><p>{group.items.join(" · ")}</p></div>)}</div></section>
    <section id="honors" className="home-section"><div className="section-heading"><h2>Selected honors</h2></div><ul className="honors-list">{DATA.honors.map(item => <li key={item.title}><span>{item.title}</span><span className="date">{item.date}</span></li>)}</ul></section>
    <section id="contact" className="home-section contact-section"><div className="section-heading"><h2>Get in touch</h2></div><p>{DATA.focus}.</p><div className="contact-links"><a href={"mailto:" + DATA.contact.email}>{DATA.contact.email}</a><a href={DATA.contact.github} target="_blank" rel="noreferrer">GitHub / SORMaker</a></div></section>
  </main>;
}
