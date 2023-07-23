import { CodeBlock, Tabs } from "@paulhalleux/react-playground";

import { Examples, ExamplesSources } from "../../__generated__";

type ExampleProps = {
  name: string;
  hideCode?: boolean;
  props?: Record<string, any>;
};

export function Example({ name, hideCode, props }: ExampleProps) {
  const { ExampleComponent, sources } = getExampleInfo(name);

  if (hideCode) {
    return <ExampleComponent {...props} />;
  }

  return (
    <Tabs layout="compact">
      <Tabs.Tab label="Preview" id="preview">
        <ExampleComponent {...props} />
      </Tabs.Tab>
      <Tabs.Tab label="Code" id="code">
        <pre>
          <CodeBlock defaultExpanded>{sources}</CodeBlock>
        </pre>
      </Tabs.Tab>
    </Tabs>
  );
}

function getExampleInfo(name: string) {
  const ExampleComponent =
    Examples[name.replace("/", "") as keyof typeof Examples].component;

  const sources =
    ExamplesSources[name.replace("/", "") as keyof typeof ExamplesSources];

  return {
    ExampleComponent,
    sources,
  };
}
