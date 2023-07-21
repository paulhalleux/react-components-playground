import { Code } from "../../../src/components/Mdx/Code/Code";
import { Table } from "../../../src/components/Mdx/Table/Table";

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
    <Table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Type</th>
          <th>Required</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property) => (
          <tr key={property.name}>
            <td>
              <Code>{property.name}</Code>
            </td>
            <td>
              <Code>{property.type}</Code>
            </td>
            <td>{property.required ? "Yes" : "No"}</td>
            <td>
              <Code>{property.default}</Code>
            </td>
            <td>{property.description}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
