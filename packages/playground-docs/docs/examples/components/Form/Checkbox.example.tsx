import React from "react";
import { Checkbox, CheckboxSize } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type CheckboxExampleControls = {
  label: string;
  required: boolean;
  size: CheckboxSize;
};

function CheckboxExample({
  controls,
}: ExampleComponentProps<CheckboxExampleControls>) {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      id="example"
      name="example"
      checked={checked}
      onChange={setChecked}
      {...controls}
    />
  );
}

export const metadata: ExampleMetadata = {
  name: "Checkbox",
  component: CheckboxExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "string",
      property: "label",
      value: "Label",
      label: "Label",
    },
    {
      type: "boolean",
      property: "required",
      value: false,
      label: "Required",
    },
    {
      type: "select",
      property: "size",
      label: "Size",
      options: ["small", "medium", "large"],
      value: "medium",
    },
  ],
};
