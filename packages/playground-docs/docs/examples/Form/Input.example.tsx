import { Input, InputSize, InputState } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../src/components/Mdx/Example";

type InputExampleControls = {
  label: string;
  message: string;
  size: InputSize;
  state: InputState;
  required: boolean;
  disabled: boolean;
};

function InputExample({
  controls,
}: ExampleComponentProps<InputExampleControls>) {
  return <Input {...controls} value="value" onChange={() => {}} />;
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
      type: "string",
      property: "label",
      value: "Label",
      label: "Label",
    },
    {
      type: "string",
      property: "message",
      value: "",
      label: "Message",
    },
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
      property: "required",
      label: "Required",
      value: false,
    },
    {
      type: "boolean",
      property: "disabled",
      label: "Disabled",
      value: false,
    },
  ],
};
