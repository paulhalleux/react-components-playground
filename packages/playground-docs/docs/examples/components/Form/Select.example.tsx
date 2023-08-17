import * as React from "react";
import { InputSize, InputState, Select } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type SelectExampleControls = {
  size: InputSize;
  state: InputState;
  disabled: boolean;
};

function SelectExample({
  controls,
}: ExampleComponentProps<SelectExampleControls>) {
  const [value, setValue] = React.useState("value");
  return (
    <Select
      {...controls}
      value={value}
      onChange={setValue}
      options={[
        { value: "value", label: "Value" },
        { value: "value2", label: "Value 2" },
        { value: "value3", label: "Value 3" },
      ]}
    />
  );
}

export const metadata: ExampleMetadata = {
  name: "Select",
  component: SelectExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "select",
      property: "size",
      label: "Size",
      value: "medium",
      options: ["small", "medium", "large"],
    },
    {
      type: "select",
      property: "state",
      label: "State",
      value: "default",
      options: ["default", "error", "success", "warning"],
    },
    {
      type: "boolean",
      property: "disabled",
      label: "Disabled",
      value: false,
    },
  ],
};
