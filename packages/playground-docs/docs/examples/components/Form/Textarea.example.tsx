import * as React from "react";
import { InputState, Textarea } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type TextareaExampleControls = {
  state: InputState;
  disabled: boolean;
};

function TextareaExample({
  controls,
}: ExampleComponentProps<TextareaExampleControls>) {
  const [value, setValue] = React.useState("value");
  return <Textarea {...controls} value={value} onChange={setValue} />;
}

export const metadata: ExampleMetadata = {
  name: "Textarea",
  component: TextareaExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
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
