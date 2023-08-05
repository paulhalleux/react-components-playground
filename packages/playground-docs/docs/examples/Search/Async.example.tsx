import { Search, SearchItemBase } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../src/components/Mdx/Example";

import { cities } from "./cities";

function AsyncExample() {
  return (
    <Search
      placeholder="Search city..."
      items={(search) => {
        return new Promise<SearchItemBase[]>((resolve) => {
          setTimeout(() => {
            resolve(
              cities.filter((city) =>
                city.label.toLowerCase().includes(search.toLowerCase()),
              ),
            );
          }, 1000);
        });
      }}
    />
  );
}

export const metadata: ExampleMetadata = {
  name: "Async",
  component: AsyncExample,
  display: {
    padding: true,
    align: "center",
    direction: "column",
  },
};
