import * as React from "react";
import { CheckboxSize, Rating } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type RatingExampleControls = {
  disabled: boolean;
  size: CheckboxSize;
};

function RatingExample({
  controls,
}: ExampleComponentProps<RatingExampleControls>) {
  const [value, setValue] = React.useState(0);

  return (
    <Rating
      id="example"
      name="example"
      value={value}
      onChange={setValue}
      {...controls}
    />
  );
}

export const metadata: ExampleMetadata = {
  name: "Rating",
  component: RatingExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
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
