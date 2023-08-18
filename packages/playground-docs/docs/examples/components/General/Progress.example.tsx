import {
  Progress,
  ProgressSize,
  ProgressVariant,
} from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type ProgressExampleControls = {
  progress: number;
  size: ProgressSize;
  variant: ProgressVariant;
};

function ProgressExample({
  controls,
}: ExampleComponentProps<ProgressExampleControls>) {
  return <Progress {...controls} />;
}

export const metadata: ExampleMetadata = {
  name: "Progress",
  component: ProgressExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "number",
      value: 50,
      min: 0,
      max: 100,
      property: "progress",
      step: 1,
      label: "Progress",
    },
    {
      type: "select",
      value: "medium",
      property: "size",
      label: "Size",
      options: ["small", "medium", "large"],
    },
    {
      type: "select",
      value: "default",
      property: "variant",
      label: "Variant",
      options: ["default", "info", "success", "warning", "danger", "primary"],
    },
  ],
};
