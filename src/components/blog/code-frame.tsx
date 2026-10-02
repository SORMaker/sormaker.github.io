"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

export function CodeFrame({ text, children }: { text: string; children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setFailed(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setFailed(true);
    }
  }
  return (
    <div className="blog-code relative my-6 rounded-xl border">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-2 top-2 z-10 rounded-md border bg-background p-2 text-muted-foreground hover:text-foreground focus-visible:outline-2"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
      <span className="sr-only" role="status">{failed ? "Copy unavailable. Select the code to copy it." : copied ? "Code copied." : ""}</span>
      {children}
    </div>
  );
}
