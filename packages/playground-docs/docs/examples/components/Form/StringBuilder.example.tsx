import * as React from "react";
import { useState } from "react";
import {
  Divider,
  Flex,
  StringBuilder,
  Text,
} from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../../src/components/Mdx/Example";

function StringBuilderExample() {
  const [value, setValue] = useState(
    `Hello {{first_name}} {{last_name}},\n\nThank you for registering to our platform.\n\nYour account has been created with the following email: {{email}}.\n\nBest regards,\n\nThe team - {{ date }}`,
  );
  return (
    <Flex flexDirection="column" gap={16}>
      <StringBuilder
        value={value}
        onChange={setValue}
        variables={[
          { label: "First name", value: "first_name" },
          { label: "Last name", value: "last_name" },
          { label: "Email", value: "email" },
        ]}
      />
      <Divider style={{ width: "100%" }} />
      <Text variant="secondary" type="text-xs">
        <pre
          dangerouslySetInnerHTML={{
            __html: value
              .replace(
                /{{/g,
                "<mark style='padding: 2px 4px; color: rgba(var(--color-text)); background: rgba(var(--color-main-contrast))'>{{",
              )
              .replace(/}}/g, "}}</mark>"),
          }}
        />
      </Text>
    </Flex>
  );
}

export const metadata: ExampleMetadata = {
  name: "StringBuilder",
  component: StringBuilderExample,
  display: {
    padding: true,
    align: "center",
    grow: true,
  },
};
