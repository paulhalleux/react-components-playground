import {
  Button,
  Popover,
  PopoverAlignment,
  PopoverPosition,
  PopoverTrigger,
} from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type TooltipExampleControls = {
  position: PopoverPosition;
  alignment: PopoverAlignment;
  trigger: PopoverTrigger;
  closeOnClickOutside: boolean;
};

function PopoverExample({
  controls,
}: ExampleComponentProps<TooltipExampleControls>) {
  return (
    <Popover
      content={
        <div>
          <p>Popover content</p>
        </div>
      }
      {...controls}
    >
      <Button>{controls.trigger === "hover" ? "Hover" : "Click"} me!</Button>
    </Popover>
  );
}

export const metadata: ExampleMetadata = {
  name: "Popover",
  component: PopoverExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
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
      type: "boolean",
      label: "Close on click outside",
      property: "closeOnClickOutside",
      value: true,
    },
  ],
};
