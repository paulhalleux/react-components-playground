import { Table } from "@paulhalleux/react-playground";

import componentsProps from "../../../../docs/__generated__/props.json";
import { Alert } from "../../Alert";
import { Code } from "../Code/Code";

type PropertiesProps = {
  component: string;
};

export function Properties({ component }: PropertiesProps) {
  const Props = componentsProps[component as keyof typeof componentsProps] as {
    name: string;
    description: string;
    type: string;
    required: boolean;
    defaultValue: any;
  }[];

  if (!Props) {
    return (
      <Alert>
        Could not find properties for component <Code>{component}</Code>
      </Alert>
    );
  }

  return (
    <Table
      columns={[
        {
          key: "name",
          label: "Property",
          width: "20%",
          render: (label) => <Code>{label}</Code>,
        },
        { key: "description", label: "Description", width: "50%" },
        {
          key: "type",
          label: "Type",
          width: "10%",
          render: (label) => <Code>{label}</Code>,
        },
        {
          key: "required",
          label: "Required",
          width: "10%",
          render: (value) => (value ? "Yes" : "No"),
        },
        {
          key: "defaultValue",
          label: "Default",
          width: "10%",
          render: (label) => <Code>{label}</Code>,
        },
      ]}
      data={Props.map((p) => ({ ...p, id: p.name }))}
    />
  );
}
