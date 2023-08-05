import { CodeBlock } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../src/components/Mdx/Example";

function CodeBlockExample() {
  const code = `import { CodeBlock } from "@paulhalleux/react-playground";
  
const ContentStyle = {
  padding: 12,
  backgroundColor: "rgb(var(--color-main-light), .2)",
  border: "1px solid rgb(var(--color-border))",
  borderRadius: 4,
  height: "100%",
  flexGrow: 1
};

function CodeBlockExample() {
  return (
    <CodeBlock>
      {ContentStyle}
    </CodeBlock>
  );
}`;

  return <CodeBlock language="tsx">{code}</CodeBlock>;
}

export const metadata: ExampleMetadata = {
  name: "CodeBlock",
  component: CodeBlockExample,
  display: {
    padding: true,
    grow: true,
  },
};
