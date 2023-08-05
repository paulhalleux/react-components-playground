import { useState } from "react";
import { Icons, Search } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../src/components/Mdx/Example";

import styles from "./Icons.example.module.scss";

function IconsExample() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className={styles.container}>
      <Search
        placeholder="Search icon..."
        value={search}
        onChange={setSearch}
      />
      <div className={styles.icons__container}>
        {Object.keys(Icons)
          .filter((icon) => icon.toLowerCase().includes(search.toLowerCase()))
          .map((icon) => {
            const Icon = Icons[icon as keyof typeof Icons];

            return (
              <div key={icon} className={styles.icon}>
                <Icon width={24} height={24} />
                <div className={styles.icon__label} title={icon}>
                  {icon.replace(/Icon$/, "")}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export const metadata: ExampleMetadata = {
  name: "Icons",
  component: IconsExample,
  display: {
    border: false,
    align: "center",
    grow: true,
  },
};
