import { Label } from "@paulhalleux/react-playground";

import { ExampleComponentProps, ExampleMetadata } from "../../components";

type LabelExampleControls = {
  label: string;
  required: boolean;
};

function LabelExample({
  controls,
}: ExampleComponentProps<LabelExampleControls>) {
  return <Label {...controls}>{controls.label}</Label>;
}

export const metadata: ExampleMetadata = {
  name: "Label",
  component: LabelExample,
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
      label: "Required",
      value: false,
    },
  ],
};
