import { Flex } from "@paulhalleux/react-playground";
import { omit } from "lodash";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../../src/components/Mdx/Example";

import { Item } from "./Item";

type DefaultExampleControls = {
  gap: number;
  alignItems: "center" | "flex-start" | "flex-end" | "baseline" | "stretch";
  justifyContent:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  direction: "row" | "column";
  flexGrow: boolean;
};

function DefaultExample({
  controls,
}: ExampleComponentProps<DefaultExampleControls>) {
  return (
    <Flex
      style={{
        padding: "10px",
        border: "1px solid rgba(var(--color-primary), 0.5)",
        borderRadius: "5px",
        minHeight: "200px",
      }}
      {...omit(controls, "flexGrow")}
    >
      <Flex.Item
        grow={false}
        as={Item}
        flexGrow={controls.flexGrow ? 1 : undefined}
      />
      <Flex.Item
        grow={false}
        as={Item}
        flexGrow={controls.flexGrow ? 1 : undefined}
      />
      <Flex.Item
        grow={false}
        as={Item}
        flexGrow={controls.flexGrow ? 1 : undefined}
      />
      <Flex.Item
        grow={false}
        as={Item}
        flexGrow={controls.flexGrow ? 1 : undefined}
      />
    </Flex>
  );
}

export const metadata: ExampleMetadata = {
  name: "Default",
  component: DefaultExample,
  display: {
    padding: true,
    align: "center",
    grow: true,
  },
  controls: [
    {
      property: "gap",
      type: "number",
      value: 10,
      label: "Gap",
      max: 100,
      min: 0,
    },
    {
      property: "alignItems",
      type: "select",
      value: "center",
      label: "Align items",
      options: ["center", "flex-start", "flex-end", "baseline", "stretch"],
    },
    {
      property: "justifyContent",
      type: "select",
      value: "center",
      label: "Justify content",
      options: [
        "center",
        "flex-start",
        "flex-end",
        "space-between",
        "space-around",
        "space-evenly",
      ],
    },
    {
      property: "flexDirection",
      type: "select",
      value: "row",
      label: "Direction",
      options: ["row", "column"],
    },
    {
      property: "flexGrow",
      type: "boolean",
      value: false,
      label: "Grow",
    },
  ],
};
