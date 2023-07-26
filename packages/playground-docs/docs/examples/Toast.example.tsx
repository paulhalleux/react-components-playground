import { Button, useToaster } from "@paulhalleux/react-playground";

import { ExampleComponentProps, ExampleMetadata } from "../components";

type ToastExampleControls = {
  title: string;
  content: string;
  closable: boolean;
  action: boolean;
};

function ToastExample({
  controls,
}: ExampleComponentProps<ToastExampleControls>) {
  const { pushToast } = useToaster();

  const onClick = () => {
    pushToast({
      type: "primary",
      duration: 5000,
      actionLabel: controls.action ? "Action" : undefined,
      onAction: () => alert("Action Clicked"),
      ...controls,
    });
  };

  return <Button onClick={onClick}>Send Toast</Button>;
}

export const metadata: ExampleMetadata = {
  name: "Toast",
  component: ToastExample,
  controls: [
    { type: "string", label: "Title", property: "title", value: "Toast Title" },
    {
      type: "string",
      label: "Content",
      property: "content",
      value: "Toast Content",
    },
    {
      type: "boolean",
      label: "Closable",
      property: "closable",
      value: true,
    },
    {
      type: "boolean",
      label: "Action",
      property: "action",
      value: true,
    },
  ],
  display: {
    padding: true,
    align: "center",
  },
};
