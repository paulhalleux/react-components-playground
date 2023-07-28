import { Tabs } from "@paulhalleux/react-playground";

import { ExampleComponentProps, ExampleMetadata } from "../../components";

const ContentStyle = {
  padding: 12,
  backgroundColor: "rgb(var(--color-main-light), .2)",
  border: "1px solid rgb(var(--color-border))",
  borderRadius: "0 4px 4px 4px",
  height: "100%",
  flexGrow: 1,
};

export type CompactExampleControls = {
  addButton: boolean;
  closeable: boolean;
};

function CompactExample({
  controls,
}: ExampleComponentProps<CompactExampleControls>) {
  return (
    <Tabs orientation="vertical" layout="compact" {...controls}>
      <Tabs.Tab id="tab1" label="Tab 1" closeable={controls.closeable}>
        <p style={ContentStyle}>Tab 1 content</p>
      </Tabs.Tab>
      <Tabs.Tab id="tab2" label="Tab 2" closeable={controls.closeable}>
        <p style={ContentStyle}>Tab 2 content</p>
      </Tabs.Tab>
      <Tabs.Tab id="tab3" label="Tab 3" closeable={controls.closeable}>
        <p style={ContentStyle}>Tab 3 content</p>
      </Tabs.Tab>
    </Tabs>
  );
}

export const metadata: ExampleMetadata = {
  name: "Compact",
  component: CompactExample,
  display: {
    padding: true,
  },
  controls: [
    {
      label: "Add button",
      type: "boolean",
      value: true,
      property: "addButton",
    },
    {
      label: "Closeable",
      type: "boolean",
      value: false,
      property: "closeable",
    },
  ],
};
