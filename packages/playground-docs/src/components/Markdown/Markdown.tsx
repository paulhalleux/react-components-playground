import { ForwardedRef, forwardRef, JSX } from "react";

import { mdxComponents } from "../Mdx";

type MarkdownComponents = Record<string, any>;
type MarkdownProps = {
  content: (props: { components: MarkdownComponents }) => JSX.Element | null;
  components?: MarkdownComponents;
};

function Markdown(
  { content: MarkdownRenderer, components = {} }: MarkdownProps,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <div ref={ref}>
      <MarkdownRenderer
        components={{
          ...mdxComponents,
          ...components,
        }}
      />
    </div>
  );
}

const ForwardedMarkdown = forwardRef(Markdown);

export { ForwardedMarkdown as Markdown };
