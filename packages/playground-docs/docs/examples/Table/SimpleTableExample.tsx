import { Table } from "@paulhalleux/react-playground";

import { Display } from "../../components";

type Person = {
  id: number;
  name: string;
  age: number;
};

export function SimpleTableExample() {
  return (
    <Display padding={24} align="center">
      <Table<Person>
        columns={[
          { key: "id", label: "ID", width: 100 },
          {
            key: "name",
            label: "Name",
            sortable: true,
            sortFn: sortName,
            width: 200,
          },
          { key: "age", label: "Age", width: 100 },
        ]}
        data={[
          { id: 1, name: "Paul", age: 30 },
          { id: 2, name: "John", age: 40 },
          { id: 3, name: "Jane", age: 50 },
        ]}
      />
    </Display>
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
