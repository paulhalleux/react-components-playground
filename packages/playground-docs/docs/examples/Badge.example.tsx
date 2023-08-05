import { Badge } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../src/components/Mdx/Example";

const GroupStyle = {
  display: "flex",
  gap: 24,
  alignItems: "center",
};

type BadgeExampleControls = {
  variant: "default" | "primary" | "secondary" | "warning";
  pill: "badge" | "pill";
};

function BadgeExample({
  controls,
}: ExampleComponentProps<BadgeExampleControls>) {
  return (
    <>
      <div style={GroupStyle}>
        <Badge size="small" {...controls} pill={controls.pill === "pill"}>
          Badge content
        </Badge>
      </div>
      <div style={GroupStyle}>
        <Badge size="medium" {...controls} pill={controls.pill === "pill"}>
          Badge content
        </Badge>
      </div>
      <div style={GroupStyle}>
        <Badge size="large" {...controls} pill={controls.pill === "pill"}>
          Badge content
        </Badge>
      </div>
    </>
  );
}

export const metadata: ExampleMetadata = {
  name: "Badge",
  component: BadgeExample,
  controls: [
    {
      label: "Status",
      type: "select",
      value: "default",
      property: "variant",
      options: [
        "default",
        "primary",
        "secondary",
        "warning",
        "danger",
        "success",
        "info",
        "ghost",
      ],
    },
    {
      label: "Type",
      type: "select",
      value: "badge",
      property: "pill",
      options: ["badge", "pill"],
    },
    {
      label: "Closeable",
      type: "boolean",
      value: false,
      property: "closeable",
    },
  ],
  display: {
    padding: true,
    align: "center",
    direction: "column",
  },
};
