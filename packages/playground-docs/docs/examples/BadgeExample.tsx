import { Badge } from "@paulhalleux/react-playground";

import { Display } from "../components";

const GroupStyle = {
  display: "flex",
  gap: 24,
  alignItems: "center",
};

export function BadgeExample({ pill }: { pill?: boolean }) {
  return (
    <Display padding={24} align="center" direction="column">
      <div style={GroupStyle}>
        <Badge pill={pill} size="small">
          Default
        </Badge>
        <Badge pill={pill} size="small" variant="primary">
          Primary
        </Badge>
        <Badge pill={pill} size="small" variant="secondary">
          Secondary
        </Badge>
      </div>
      <div style={GroupStyle}>
        <Badge pill={pill} size="medium">
          Default
        </Badge>
        <Badge pill={pill} size="medium" variant="primary">
          Primary
        </Badge>
        <Badge pill={pill} size="medium" variant="secondary">
          Secondary
        </Badge>
      </div>
      <div style={GroupStyle}>
        <Badge pill={pill} size="large">
          Default
        </Badge>
        <Badge pill={pill} size="large" variant="primary">
          Primary
        </Badge>
        <Badge pill={pill} size="large" variant="secondary">
          Secondary
        </Badge>
      </div>
    </Display>
  );
}
