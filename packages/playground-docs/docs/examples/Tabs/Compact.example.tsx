import { Tabs } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../components";

const ContentStyle = {
  padding: 12,
  backgroundColor: "rgb(var(--color-main-light), .2)",
  border: "1px solid rgb(var(--color-border))",
  borderRadius: "0 4px 4px 4px",
  height: "100%",
  flexGrow: 1,
};

function CompactExample() {
  return (
    <Tabs orientation="vertical" layout="compact">
      <Tabs.Tab id="tab1" label="Tab 1">
        <p style={ContentStyle}>Tab 1 content</p>
      </Tabs.Tab>
      <Tabs.Tab id="tab2" label="Tab 2">
        <p style={ContentStyle}>Tab 2 content</p>
      </Tabs.Tab>
      <Tabs.Tab id="tab3" label="Tab 3">
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
};
