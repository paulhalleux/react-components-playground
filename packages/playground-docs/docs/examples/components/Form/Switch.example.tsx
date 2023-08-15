import * as React from "react";
import { CheckboxSize, Switch } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type SwitchExampleControls = {
  label: string;
  required: boolean;
  disabled: boolean;
  size: CheckboxSize;
};

function SwitchExample({
  controls,
}: ExampleComponentProps<SwitchExampleControls>) {
  const [checked, setChecked] = React.useState(false);

  return (
    <Switch
      id="switch"
      name="switch"
      checked={checked}
      onChange={setChecked}
      {...controls}
    />
  );
}

export const metadata: ExampleMetadata = {
  name: "Switch",
  component: SwitchExample,
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
      type: "boolean",
      property: "disabled",
      value: false,
      label: "Disabled",
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
