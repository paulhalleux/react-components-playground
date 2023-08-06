import { Anchor } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../src/components/Mdx/Example";

type AnchorExampleControls = {
  to: string;
  children: string;
};

function AnchorExample({
  controls,
}: ExampleComponentProps<AnchorExampleControls>) {
  return <Anchor {...controls} />;
}

export const metadata: ExampleMetadata = {
  name: "Anchor",
  component: AnchorExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "string",
      label: "To",
      property: "to",
      value: "https://www.google.com",
    },
    {
      type: "string",
      label: "Label",
      property: "children",
      value: "Google",
    },
    {
      type: "select",
      label: "Target",
      property: "target",
      value: "_blank",
      options: ["_blank", "_self", "_parent", "_top"],
    },
    {
      type: "select",
      label: "Variant",
      property: "variant",
      value: "default",
      options: ["default", "secondary"],
    },
    {
      type: "select",
      label: "Size",
      property: "size",
      value: "inherit",
      options: ["inherit", "small", "medium", "large"],
    },
    {
      type: "boolean",
      label: "Underline",
      property: "underline",
      value: false,
    },
  ],
};
