import { Button, useToaster } from "@paulhalleux/react-playground";

import { Display, ExampleComponentProps } from "../components";

type BadgeExampleControls = {
  variant: "default" | "primary" | "secondary" | "warning";
  pill: "badge" | "pill";
};

function ToastExample({}: ExampleComponentProps<BadgeExampleControls>) {
  const { pushToast } = useToaster();

  const onClick = () => {
    pushToast({
      title: "Toast Title",
      content: "Toast Content",
      type: "primary",
      duration: 5000,
      closable: true,
      actionLabel: "Action",
      onAction: () => alert("Action Clicked"),
    });
  };

  return (
    <Display padding={24} align="center" direction="column">
      <Button onClick={onClick}>Send Toast</Button>
    </Display>
  );
}

export default {
  name: "Toast",
  component: ToastExample,
};
