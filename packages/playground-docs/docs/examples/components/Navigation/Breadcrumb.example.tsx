import { Breadcrumb, BreadcrumbSize } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type BreadcrumbExampleControls = {
  size: BreadcrumbSize;
};

function BreadcrumbExample({
  controls,
}: ExampleComponentProps<BreadcrumbExampleControls>) {
  return (
    <Breadcrumb
      {...controls}
      items={[{ label: "Home", href: "/" }, { label: "Breadcrumb" }]}
    />
  );
}

export const metadata: ExampleMetadata = {
  name: "Breadcrumb",
  component: BreadcrumbExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "select",
      label: "Size",
      property: "size",
      options: ["small", "medium", "large"],
      value: "medium",
    },
  ],
};
