import { useState } from "react";
import { Search } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../components";

import { cities } from "./cities";

function SimpleExample() {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  return (
    <>
      <small>
        Start typing to search for a city. Click outside the search box to close
        the dropdown.
      </small>
      <Search
        placeholder="Search city..."
        items={cities}
        onItemSelect={(item) => setSelected(item.label)}
      />
      {selected && <small>Selected: {selected}</small>}
    </>
  );
}

export const metadata: ExampleMetadata = {
  name: "Search",
  component: SimpleExample,
  display: {
    padding: true,
    align: "center",
    direction: "column",
  },
};
