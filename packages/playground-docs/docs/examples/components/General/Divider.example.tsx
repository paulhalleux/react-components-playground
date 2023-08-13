import { Divider, DividerOrientation } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type DividerExampleControls = {
  orientation: DividerOrientation;
};

function DividerExample({
  controls,
}: ExampleComponentProps<DividerExampleControls>) {
  return <Divider {...controls} />;
}

export const metadata: ExampleMetadata = {
  name: "Divider",
  component: DividerExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "select",
      value: "horizontal",
      label: "Orientation",
      options: ["horizontal", "vertical"],
      property: "orientation",
    },
  ],
};
