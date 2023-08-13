import {
  Button,
  ButtonSize,
  ButtonVariant,
  ClickIcon,
} from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../../src/components/Mdx/Example";

type ButtonExampleControls = {
  size: ButtonSize;
  variant: ButtonVariant;
  disabled: boolean;
  loading: boolean;
};

function IconExample({
  controls,
}: ExampleComponentProps<ButtonExampleControls>) {
  return <Button.Icon icon={ClickIcon} {...controls} />;
}

export const metadata: ExampleMetadata = {
  name: "Icon button",
  component: IconExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "select",
      property: "size",
      label: "Size",
      value: "medium",
      options: ["small", "medium", "large"],
    },
    {
      type: "select",
      property: "variant",
      label: "Variant",
      value: "default",
      options: ["default", "primary", "success", "danger", "warning"],
    },
    {
      type: "boolean",
      property: "disabled",
      label: "Disabled",
      value: false,
    },
    {
      type: "boolean",
      property: "loading",
      label: "Loading",
      value: false,
    },
  ],
};
