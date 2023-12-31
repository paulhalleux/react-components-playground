import { Badge, BadgeVariant, Flex } from "@paulhalleux/react-playground";
import { BadgeShape } from "@paulhalleux/react-playground/src/components/Badge/Badge";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type BadgeExampleControls = {
  variant: BadgeVariant;
  shape: BadgeShape;
};

function BadgeExample({
  controls,
}: ExampleComponentProps<BadgeExampleControls>) {
  return (
    <Flex alignItems="center" justifyContent="center" gap={10}>
      <Badge size="small" {...controls}>
        Badge content
      </Badge>
      <Badge size="large" {...controls}>
        Badge content
      </Badge>
    </Flex>
  );
}

export const metadata: ExampleMetadata = {
  name: "Badge",
  component: BadgeExample,
  controls: [
    {
      label: "Variant",
      type: "select",
      value: "default",
      property: "variant",
      options: [
        "default",
        "secondary",
        "info",
        "primary",
        "success",
        "warning",
        "danger",
      ],
    },
    {
      label: "Shape",
      type: "select",
      value: "default",
      property: "shape",
      options: ["default", "pill"],
    },
  ],
  display: {
    padding: true,
    align: "center",
    direction: "column",
  },
};
