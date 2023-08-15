import { Table } from "@paulhalleux/react-playground";

import componentsProps from "@/generated/props.json";

import { Alert } from "../../Alert";
import { Code } from "../Code/Code";

import styles from "./Properties.module.scss";

type ComponentProp = {
  name: string;
  description: string;
  type: string;
  required: boolean;
  defaultValue: any;
};

type PropertiesProps = {
  component: string;
  omit?: string[];
  additional?: ComponentProp[];
};

export function Properties({ component, omit, additional }: PropertiesProps) {
  const Props = component
    ? (componentsProps[
        component as keyof typeof componentsProps
      ] as ComponentProp[])
    : [];

  if (!Props && !additional) {
    return (
      <Alert>
        Could not find properties for component <Code>{component}</Code>
      </Alert>
    );
  }

  return (
    <Table
      className={styles.table}
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
      data={[
        ...Props.filter((p) => omit === undefined || !omit.includes(p.name)),
        ...(additional || []),
      ].map((p) => ({ ...p, id: p.name }))}
    />
  );
}
