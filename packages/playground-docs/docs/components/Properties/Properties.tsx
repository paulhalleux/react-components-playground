import { Table } from "@paulhalleux/react-playground";

import { Code } from "../../../src/components/Mdx/Code/Code";

type PropertiesProps = {
  properties: {
    name: string;
    type: string;
    required: boolean;
    default: string;
    description: string;
  }[];
};

export function Properties({ properties }: PropertiesProps) {
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
          key: "default",
          label: "Default",
          width: "10%",
          render: (label) => <Code>{label}</Code>,
        },
      ]}
      data={properties.map((p) => ({ ...p, id: p.name }))}
    />
  );
}
