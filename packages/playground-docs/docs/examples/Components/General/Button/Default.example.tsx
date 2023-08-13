import {
  Button,
  ButtonSize,
  ButtonVariant,
} from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../../src/components/Mdx/Example";

type ButtonExampleControls = {
  children: string;
  size: ButtonSize;
  variant: ButtonVariant;
  disabled: boolean;
  loading: boolean;
};

function DefaultExample({
  controls,
}: ExampleComponentProps<ButtonExampleControls>) {
  return <Button {...controls} />;
}

export const metadata: ExampleMetadata = {
  name: "Default",
  component: DefaultExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "string",
      property: "children",
      label: "Text",
      value: "Click me",
    },
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
