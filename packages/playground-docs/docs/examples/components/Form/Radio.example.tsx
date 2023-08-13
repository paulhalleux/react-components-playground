import React from "react";
import { Radio, RadioSize } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type RadioExampleControls = {
  required: boolean;
  size: RadioSize;
};

function RadioExample({
  controls,
}: ExampleComponentProps<RadioExampleControls>) {
  const [selected, setSelected] = React.useState<string>("item1");

  return (
    <>
      <div>
        <Radio
          label="Item 1"
          id="item1"
          name="test"
          selected={selected}
          value="item1"
          onChange={setSelected}
          {...controls}
          style={{ marginBottom: "6px" }}
        />
        <Radio
          label="Item 2"
          id="item2"
          name="test"
          selected={selected}
          value="item2"
          onChange={setSelected}
          {...controls}
        />
      </div>
      <span>
        Selected: <strong>{selected}</strong>
      </span>
    </>
  );
}

export const metadata: ExampleMetadata = {
  name: "Radio",
  component: RadioExample,
  display: {
    padding: true,
    align: "center",
    direction: "column",
  },
  controls: [
    {
      type: "boolean",
      property: "required",
      value: false,
      label: "Required",
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
