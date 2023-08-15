import { ArrowRightIcon, Table } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../../../src/components/Mdx/Example";

type Person = {
  id: number;
  name: string;
  age: number;
};

function CustomRenderingExample() {
  return (
    <Table<Person>
      columns={[
        { key: "id", label: "ID", width: 100 },
        {
          key: "name",
          label: "Name",
          sortable: true,
          sortFn: sortName,
          width: 200,
          renderHeader: (label) => (
            <span style={{ textDecoration: "underline" }}>{label}</span>
          ),
          render: (value) => (
            <span
              style={{
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ArrowRightIcon size={16} />
              {value}
            </span>
          ),
        },
        { key: "age", label: "Age", width: 100 },
      ]}
      data={[
        { id: 1, name: "Paul", age: 30 },
        { id: 2, name: "John", age: 40 },
        { id: 3, name: "Jane", age: 50 },
      ]}
    />
  );
}

function sortName(a: Person, b: Person, sort: "asc" | "desc" | null) {
  if (sort === "asc") {
    return a.name.localeCompare(b.name);
  } else if (sort === "desc") {
    return b.name.localeCompare(a.name);
  } else {
    return 0;
  }
}

export const metadata: ExampleMetadata = {
  name: "CustomRendering",
  component: CustomRenderingExample,
  display: {
    padding: true,
    align: "center",
  },
};
