import { Text, TextType, TextVariant } from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type TextExampleControls = {
  type: TextType;
  variant: TextVariant;
};

function TextExample({ controls }: ExampleComponentProps<TextExampleControls>) {
  return (
    <Text {...controls}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod,
      nisl eget aliquam ultricies, nunc
    </Text>
  );
}

export const metadata: ExampleMetadata = {
  name: "Text",
  component: TextExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      property: "type",
      type: "select",
      value: "text-md",
      label: "Type",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "text-xs",
        "text-sm",
        "text-md",
        "text-lg",
        "text-xl",
      ],
    },
    {
      property: "variant",
      type: "select",
      value: "default",
      label: "Variant",
      options: [
        "default",
        "secondary",
        "info",
        "primary",
        "success",
        "warning",
        "danger",
      ],
    },
  ],
};
