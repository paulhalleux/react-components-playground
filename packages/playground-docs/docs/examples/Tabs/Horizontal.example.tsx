import { Tabs } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../src/components/Mdx/Example";

function HorizontalExample() {
  return (
    <Tabs orientation="horizontal" addButton>
      <Tabs.Tab contained id="tab1" label="Tab 1" closeable>
        <p style={{ padding: 12 }}>Tab 1 content</p>
      </Tabs.Tab>
      <Tabs.Tab contained id="tab2" label="Tab 2" disabled closeable>
        <p style={{ padding: 12 }}>Tab 2 content</p>
      </Tabs.Tab>
      <Tabs.Tab contained id="tab3" label="Tab 3" closeable closeDisabled>
        <p style={{ padding: 12 }}>Tab 3 content</p>
      </Tabs.Tab>
    </Tabs>
  );
}

export const metadata: ExampleMetadata = {
  name: "Horizontal",
  component: HorizontalExample,
  display: {
    padding: true,
  },
};
