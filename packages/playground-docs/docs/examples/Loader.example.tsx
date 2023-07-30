import { Loader } from "@paulhalleux/react-playground";

import { ExampleComponentProps, ExampleMetadata } from "../components";

type LoaderExampleControls = {
  size: "small" | "medium" | "large";
};

function LoaderExample({
  controls,
}: ExampleComponentProps<LoaderExampleControls>) {
  return <Loader {...controls} />;
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
  ],
};
