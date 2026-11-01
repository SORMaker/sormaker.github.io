/* eslint-disable @next/next/no-img-element */
import { MarkdownAsync } from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { CopyButton } from "./copy-button";

type HastNode = { value?: string; children?: HastNode[] };

function textOf(node: HastNode): string {
  return node.value ?? node.children?.map(textOf).join("") ?? "";
}

export default function NoteBody({ markdown }: { markdown: string }) {
  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm, remarkMath]}
      remarkRehypeOptions={{
        // The notes contain bare Rust generics such as Box<T>. Show raw HTML
        // as text instead of dropping it.
        handlers: { html: (_state, node) => ({ type: "text", value: node.value }) },
      }}
      rehypePlugins={[
        [rehypeKatex, { strict: false, throwOnError: false }],
        [
          rehypePrettyCode,
          {
            theme: { light: "github-light", dark: "github-dark" },
            keepBackground: false,
            bypassInlineCode: true,
          },
        ],
      ]}
      components={{
        pre: ({ node, children, ...props }) => (
          <div className="note-code relative my-6 rounded-xl border">
            <CopyButton text={node ? textOf(node).replace(/\n$/, "") : ""} />
            <pre {...props}>{children}</pre>
          </div>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto rounded-lg border">
            <table>{children}</table>
          </div>
        ),
        img: ({ src, alt }) => (
          <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" className="rounded-lg" />
        ),
      }}
    >
      {markdown}
    </MarkdownAsync>
  );
}
