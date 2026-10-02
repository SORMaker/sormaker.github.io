/* eslint-disable @next/next/no-img-element */
import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import { CodeFrame } from "./code-frame";

type TextNode = { value?: string; children?: TextNode[] };
function textContent(node: TextNode): string {
  return node.value ?? node.children?.map(textContent).join("") ?? "";
}

export default async function BlogMarkdown({ content }: { content: string }) {
  // Notion sometimes places the closing display delimiter after the formula.
  // Remark requires that delimiter on its own line; the equation is unchanged.
  const markdown = content.replace(
    /^([ \t]*)\$\$(.+)\$\$[ \t]*$/gm,
    (_match, indent: string, equation: string) => `${indent}$$\n${indent}${equation}\n${indent}$$`,
  ).replace(
    /(^[ \t]*\$\$\r?\n)((?:(?!\$\$)[\s\S])*?\S)\$\$(?=\r?\n|$)/gm,
    (_match, opening: string, equation: string) => `${opening}${equation}\n$$`,
  );
  return (
    <MarkdownAsync
      remarkPlugins={[remarkGfm, remarkMath]}
      remarkRehypeOptions={{
        // Treat Markdown's unquoted Rust generics (e.g. Box<T>) as text.
        // Imported notes are content, never executable HTML or MDX.
        handlers: { html: (_state, node) => ({ type: "text", value: node.value }) },
      }}
      rehypePlugins={[
        [rehypeKatex, { strict: false, throwOnError: false }],
        [rehypePrettyCode, {
          theme: { light: "github-light", dark: "github-dark" },
          keepBackground: false,
          bypassInlineCode: true,
        }],
      ]}
      components={{
        pre: ({ node, children, ...props }) => (
          <CodeFrame text={node ? textContent(node).replace(/\n$/, "") : ""}>
            <pre {...props}>{children}</pre>
          </CodeFrame>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto rounded-lg border"><table>{children}</table></div>
        ),
        img: ({ src, alt, title }) => (
          <img src={src} alt={alt ?? ""} title={title} loading="lazy" className="rounded-lg" />
        ),
      }}
    >
      {markdown}
    </MarkdownAsync>
  );
}
