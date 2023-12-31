import * as React from "react";
import { Input, InputSize, InputState } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type InputExampleControls = {
  size: InputSize;
  state: InputState;
  disabled: boolean;
};

function InputExample({
  controls,
}: ExampleComponentProps<InputExampleControls>) {
  const [value, setValue] = React.useState("value");
  return <Input {...controls} value={value} onChange={setValue} />;
}

export const metadata: ExampleMetadata = {
  name: "Input",
  component: InputExample,
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
