import { CodeBlock } from "@paulhalleux/react-playground";

import { Display } from "../components";

function CodeBlockExample() {
  const code = `import { CodeBlock } from "@paulhalleux/react-playground";
  
import { Display } from "../components";

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
    <Display padding={24}>
      <CodeBlock>
        {ContentStyle}
      </CodeBlock>
    </Display>
  );
}`;

  return (
    <Display padding={24} grow>
      <CodeBlock language="tsx">{code}</CodeBlock>
    </Display>
  );
}

export default {
  name: "CodeBlock",
  component: CodeBlockExample,
};
