import { EmptyState } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../../src/components/Mdx/Example";

function EmptyStateExample() {
  return (
    <EmptyState
      title="Component not found"
      description="The component you are looking for does not exist."
      actions={[{ type: "button", onClick: () => {}, label: "Go back" }]}
      icon="alert-triangle"
    />
  );
}

export const metadata: ExampleMetadata = {
  name: "EmptyState",
  component: EmptyStateExample,
  display: {
    padding: true,
    align: "center",
    height: 350,
  },
};
