import {
  Badge,
  StatusIndicator,
  StatusIndicatorVariant,
} from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type StatusIndicatorControls = {
  status: StatusIndicatorVariant;
  badge: boolean;
};

function StatusIndicatorExample({
  controls,
}: ExampleComponentProps<StatusIndicatorControls>) {
  if (controls.badge)
    return (
      <Badge shape="pill">
        <StatusIndicator {...controls} /> Status
      </Badge>
    );

  return <StatusIndicator {...controls} />;
}

export const metadata: ExampleMetadata = {
  name: "Status indicator",
  component: StatusIndicatorExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "select",
      property: "status",
      options: ["default", "primary", "info", "success", "warning", "danger"],
      value: "default",
      label: "Status",
    },
    {
      type: "boolean",
      property: "badge",
      value: true,
      label: "Wrap in badge",
    },
  ],
};
