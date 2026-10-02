"use client";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return <Button variant="ghost" size="icon" className="theme-toggle" aria-label="Toggle color theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}><SunIcon className="theme-sun" aria-hidden="true" /><MoonIcon className="theme-moon" aria-hidden="true" /></Button>;
}
