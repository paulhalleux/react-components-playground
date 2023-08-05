import {
  Button,
  ToasterPosition,
  ToasterProvider,
  useToaster,
} from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../src/components/Mdx/Example";

type ToastExampleControls = {
  title: string;
  content: string;
  closable: boolean;
  action: boolean;
  replace: boolean;
  position: ToasterPosition;
};

function ToastExampleWrapper({
  controls,
}: ExampleComponentProps<ToastExampleControls>) {
  return (
    <ToasterProvider replace={controls.replace} position={controls.position}>
      <ToastExample controls={controls} />
    </ToasterProvider>
  );
}

function ToastExample({
  controls,
}: ExampleComponentProps<ToastExampleControls>) {
  const { pushToast } = useToaster();

  const onClick = () => {
    pushToast({
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
  component: ToastExampleWrapper,
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
    {
      type: "boolean",
      label: "Replace",
      property: "replace",
      value: false,
    },
    {
      type: "select",
      label: "Position",
      property: "position",
      value: "top-right",
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
    },
  ],
  display: {
    padding: true,
    align: "center",
  },
};
