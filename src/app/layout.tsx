import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://sormaker.github.io"),
  title: { default: DATA.name + " · Robotics & Control", template: "%s | " + DATA.name },
  description: DATA.description, icons: { icon: "/favicon.svg" }, robots: { index: true, follow: true }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}><a className="skip-link" href="#main">Skip to content</a><div className="site-shell"><Navbar />{children}<footer className="site-footer"><span>{DATA.name}</span><a href={DATA.contact.github} target="_blank" rel="noreferrer">GitHub</a></footer></div></ThemeProvider></body></html>;
}
