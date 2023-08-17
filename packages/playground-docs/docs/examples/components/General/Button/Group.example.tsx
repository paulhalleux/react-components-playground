import {
  Button,
  ButtonGroupOrientation,
  ButtonSize,
  ButtonVariant,
  TypeIcon,
} from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../../src/components/Mdx/Example";

type ButtonExampleControls = {
  size: ButtonSize;
  variant: ButtonVariant;
  disabled: boolean;
  orientation: ButtonGroupOrientation;
  icon: boolean;
};

function GroupExample({
  controls,
}: ExampleComponentProps<ButtonExampleControls>) {
  return (
    <Button.Group>
      {controls.icon ? (
        <>
          <Button.Icon
            size={controls.size}
            variant={controls.variant}
            icon={TypeIcon}
            disabled={controls.disabled}
          />
          <Button.Icon
            size={controls.size}
            variant={controls.variant}
            icon={TypeIcon}
            disabled={controls.disabled}
          />
          <Button.Icon
            size={controls.size}
            variant={controls.variant}
            icon={TypeIcon}
            disabled={controls.disabled}
          />
        </>
      ) : (
        <>
          <Button
            size={controls.size}
            variant={controls.variant}
            disabled={controls.disabled}
          >
            Button 1
          </Button>
          <Button
            size={controls.size}
            variant={controls.variant}
            disabled={controls.disabled}
          >
            Button 2
          </Button>
          <Button
            size={controls.size}
            variant={controls.variant}
            disabled={controls.disabled}
          >
            Button 3
          </Button>
        </>
      )}
    </Button.Group>
  );
}

export const metadata: ExampleMetadata = {
  name: "Group",
  component: GroupExample,
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
      type: "select",
      property: "orientation",
      label: "Orientation",
      value: "horizontal",
      options: ["horizontal", "vertical"],
    },
    {
      type: "boolean",
      property: "disabled",
      label: "Disabled",
      value: false,
    },
    {
      type: "boolean",
      property: "icon",
      label: "Icon",
      value: false,
    },
  ],
};
