import { Badge } from "@paulhalleux/react-playground";

import { Display, ExampleComponentProps } from "../components";

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
    <Display padding={24} align="center" direction="column">
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
    </Display>
  );
}

export default {
  name: "Badge",
  component: BadgeExample,
  controls: [
    {
      label: "Status",
      type: "select",
      property: "variant",
      options: ["default", "primary", "secondary", "warning"],
    },
    {
      label: "Type",
      type: "select",
      property: "pill",
      options: ["badge", "pill"],
    },
  ],
};
