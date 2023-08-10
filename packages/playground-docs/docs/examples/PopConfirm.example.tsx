import { Button, PopConfirm } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../src/components/Mdx/Example";

function PopoverExample() {
  return (
    <PopConfirm
      title="Delete your profile?"
      description="This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
      confirmStyle="danger"
      onConfirm={() => new Promise((resolve) => setTimeout(resolve, 1000))}
    >
      <Button variant="danger">Delete your profile</Button>
    </PopConfirm>
  );
}

export const metadata: ExampleMetadata = {
  name: "Popover",
  component: PopoverExample,
  display: {
    padding: true,
    align: "center",
  },
};
