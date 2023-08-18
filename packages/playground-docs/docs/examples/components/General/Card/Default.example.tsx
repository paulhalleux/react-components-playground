import {
  Badge,
  Button,
  Card,
  CardVariant,
} from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../../src/components/Mdx/Example";

type DefaultExampleControls = {
  state: CardVariant;
};

function DefaultExample({
  controls,
}: ExampleComponentProps<DefaultExampleControls>) {
  return (
    <Card variant={controls.state}>
      <Card.Header>
        <Badge variant={controls.state as any}>Default</Badge> Lorem ipsum dolor
        sit amet, consectetur
      </Card.Header>
      <Card.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra,
        sapien quis vulputate lacinia, nisl quam ultricies augue, euismod
        aliquam nunc velit nec nisi. Nulla facilisi. Sed euismod, nisl quis
        ultrices aliquam, nunc nunc ultricies nunc, quis aliquam nunc nunc vitae
        nunc. Sed euismod, nisl quis ultrices aliquam, nunc nunc ultricies nunc,
        quis aliquam nunc nunc vitae nunc.
      </Card.Body>
      <Card.Footer border variant="secondary">
        <Button variant={controls.state} size="small">
          Button
        </Button>
      </Card.Footer>
    </Card>
  );
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
      type: "select",
      property: "state",
      label: "State",
      value: "default",
      options: [
        "default",
        "secondary",
        "info",
        "primary",
        "success",
        "danger",
        "warning",
      ],
    },
  ],
};
