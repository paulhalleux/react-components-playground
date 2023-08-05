import { Loader } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../src/components/Mdx/Example";

type LoaderExampleControls = {
  size: "small" | "medium" | "large";
  label: string;
  inline: boolean;
  hideLabel: boolean;
};

function LoaderExample({
  controls,
}: ExampleComponentProps<LoaderExampleControls>) {
  return (
    <Loader
      {...controls}
      label={controls.hideLabel ? undefined : controls.label}
      orientation={controls.inline ? "horizontal" : "vertical"}
    />
  );
}

export const metadata: ExampleMetadata = {
  name: "Loader",
  component: LoaderExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "select",
      property: "size",
      label: "Size",
      options: ["small", "medium", "large"],
      value: "medium",
    },
    {
      type: "string",
      property: "label",
      label: "Label",
      value: "Loading...",
    },
    {
      type: "boolean",
      property: "inline",
      label: "Inline",
      value: false,
    },
    {
      type: "boolean",
      property: "hideLabel",
      label: "Hide Label",
      value: false,
    },
  ],
};
