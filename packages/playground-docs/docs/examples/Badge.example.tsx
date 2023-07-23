import { Badge } from "@paulhalleux/react-playground";

import { Display, ExampleComponentProps } from "../components";

const GroupStyle = {
  display: "flex",
  gap: 24,
  alignItems: "center",
};

type BadgeExampleProps = {
  pill?: boolean;
};

type BadgeExampleControls = {
  variant: "default" | "primary" | "secondary" | "warning";
};

function BadgeExample({
  pill,
  controls,
}: ExampleComponentProps<BadgeExampleControls, BadgeExampleProps>) {
  return (
    <Display padding={24} align="center" direction="column">
      <div style={GroupStyle}>
        <Badge pill={pill} size="small" {...controls}>
          Badge content
        </Badge>
      </div>
      <div style={GroupStyle}>
        <Badge pill={pill} size="medium" {...controls}>
          Badge content
        </Badge>
      </div>
      <div style={GroupStyle}>
        <Badge pill={pill} size="large" {...controls}>
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
  ],
};
