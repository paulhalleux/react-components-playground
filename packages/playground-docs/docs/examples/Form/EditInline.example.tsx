import { useState } from "react";
import { EditInline, useConfirm } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../src/components/Mdx/Example";

type EditInlineExampleControls = {
  confirm: boolean;
};

function EditInlineExample({
  controls,
}: ExampleComponentProps<EditInlineExampleControls>) {
  const { confirm } = useConfirm();
  const [value, setValue] = useState("Change me");
  return (
    <EditInline
      value={value}
      onChange={(value) =>
        controls.confirm
          ? confirm({
              onConfirm: () => setValue(value),
              title: "Change value?",
              description: "Are you sure you want to change the value?",
            })
          : setValue(value)
      }
    />
  );
}

export const metadata: ExampleMetadata = {
  name: "EditInline",
  component: EditInlineExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "boolean",
      label: "Confirm",
      value: false,
      property: "confirm",
    },
  ],
};
