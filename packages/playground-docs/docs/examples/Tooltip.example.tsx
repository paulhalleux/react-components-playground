import {
  Button,
  Tooltip,
  TooltipAlignment,
  TooltipPosition,
} from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../src/components/Mdx/Example";

type TooltipExampleControls = {
  position: TooltipPosition;
  alignment: TooltipAlignment;
  content: string;
};

function TooltipExample({
  controls,
}: ExampleComponentProps<TooltipExampleControls>) {
  return (
    <Tooltip {...controls}>
      <Button>Hover me!</Button>
    </Tooltip>
  );
}

export const metadata: ExampleMetadata = {
  name: "Tooltip",
  component: TooltipExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "string",
      label: "Content",
      property: "content",
      value: "Click me!",
    },
    {
      type: "select",
      label: "Position",
      property: "position",
      options: ["top", "bottom", "left", "right"],
      value: "top",
    },
    {
      type: "select",
      label: "Align",
      property: "alignment",
      options: ["start", "center", "end"],
      value: "center",
    },
    {
      type: "select",
      label: "Trigger",
      property: "trigger",
      options: ["hover", "click"],
      value: "hover",
    },
    {
      type: "select",
      label: "Variant",
      property: "variant",
      options: ["default", "secondary"],
      value: "default",
    },
  ],
};
