import { Navigation, NavigationSize } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type NavigationExampleControls = {
  size: NavigationSize;
  active: boolean;
};

function NavigationExample({
  controls,
}: ExampleComponentProps<NavigationExampleControls>) {
  return (
    <Navigation {...controls}>
      <Navigation.Link href="#/">/</Navigation.Link>
      <Navigation.Link active={controls.active} href="#/components">
        Components
      </Navigation.Link>
      <Navigation.Link href="#/hooks">Hooks</Navigation.Link>
      <Navigation.Link href="#/utilities">Utilities</Navigation.Link>
    </Navigation>
  );
}

export const metadata: ExampleMetadata = {
  name: "Navigation",
  component: NavigationExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "select",
      label: "Size",
      property: "size",
      options: ["small", "large"],
      value: "large",
    },
    {
      type: "boolean",
      label: "Active",
      property: "active",
      value: true,
    },
  ],
};
