import * as React from "react";
import { Transfer } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type TransferExampleControls = {
  disabled: boolean;
};

function TransferExample({
  controls,
}: ExampleComponentProps<TransferExampleControls>) {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Transfer
      id="example"
      name="example"
      items={[
        { id: "1", label: "Item 1" },
        { id: "2", label: "Item 2" },
        { id: "3", label: "Item 3" },
        { id: "4", label: "Item 4" },
        { id: "5", label: "Item 5" },
        { id: "6", label: "Item 6" },
        { id: "7", label: "Item 7" },
        { id: "8", label: "Item 8" },
        { id: "9", label: "Item 9" },
        { id: "10", label: "Item 10" },
        { id: "11", label: "Item 11" },
        { id: "12", label: "Item 12" },
      ]}
      selectedItems={value}
      onChange={setValue}
      {...controls}
    />
  );
}

export const metadata: ExampleMetadata = {
  name: "Transfer",
  component: TransferExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "boolean",
      property: "disabled",
      value: false,
      label: "Disabled",
    },
  ],
};
