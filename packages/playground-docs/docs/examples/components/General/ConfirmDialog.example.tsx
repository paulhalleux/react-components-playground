import {
  Button,
  ButtonVariant,
  ConfirmProvider,
  useConfirm,
} from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type ConfirmExampleControls = {
  icon: boolean;
  async: boolean;
  title: string;
  description: string;
  confirmStyle: ButtonVariant;
  cancelStyle: ButtonVariant;
};

function ConfirmExampleWrapper({
  controls,
}: ExampleComponentProps<ConfirmExampleControls>) {
  return (
    <ConfirmProvider>
      <ConfirmExample controls={controls} />
    </ConfirmProvider>
  );
}

function ConfirmExample({
  controls,
}: ExampleComponentProps<ConfirmExampleControls>) {
  const { confirm } = useConfirm();

  const onConfirmAsync = () =>
    new Promise<void>((resolve) => setTimeout(resolve, 1000));

  const onConfirm = () => {};

  return (
    <Button
      onClick={() =>
        confirm({
          title: controls.title,
          description: controls.description,
          onConfirm: controls.async ? onConfirmAsync : onConfirm,
          onCancel: () => alert("Cancel"),
          icon: controls.icon ? "check" : undefined,
          confirmStyle: controls.confirmStyle,
          cancelStyle: controls.cancelStyle,
        })
      }
    >
      Confirm
    </Button>
  );
}

export const metadata: ExampleMetadata = {
  name: "Confirm Dialog",
  component: ConfirmExampleWrapper,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "boolean",
      label: "Icon",
      value: true,
      property: "icon",
    },
    {
      type: "boolean",
      label: "Async",
      value: true,
      property: "async",
    },
    {
      type: "string",
      label: "Title",
      value: "Confirm",
      property: "title",
    },
    {
      type: "string",
      label: "Description",
      value: "Are you sure you want to confirm this action?",
      property: "description",
    },
    {
      type: "select",
      label: "Confirm style",
      value: "success",
      property: "confirmStyle",
      options: ["default", "primary", "danger", "warning", "success"],
    },
    {
      type: "select",
      label: "Cancel style",
      value: "default",
      property: "cancelStyle",
      options: ["default", "primary", "danger", "warning", "success"],
    },
  ],
};
