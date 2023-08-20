import { useState } from "react";
import { Flex, Icons, Input } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../../../../src/components/Mdx/Example";

import styles from "./Icons.example.module.scss";

function IconsExample() {
  const [search, setSearch] = useState<string>("");
  const [size, setSize] = useState<number>(20);

  return (
    <div className={styles.container}>
      <Flex gap={8} alignItems="center">
        <Input
          placeholder="Search icon..."
          value={search}
          onChange={setSearch}
        />
        <Input
          type="number"
          value={size.toString()}
          onChange={(value) => setSize(parseInt(value))}
        />
      </Flex>
      <div className={styles.icons__container}>
        {Object.keys(Icons)
          .filter((icon) => icon.toLowerCase().includes(search.toLowerCase()))
          .map((icon) => {
            const Icon = Icons[icon as keyof typeof Icons];

            return (
              <div key={icon} className={styles.icon}>
                <Icon size={size} />
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
