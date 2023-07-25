import { useState } from "react";

import { ComponentList } from "../../../docs/__generated__/components";
import { Search } from "../../components";
import { groupComponents } from "../../utils/components";

import { MainItem } from "./MainItem";

import styles from "./MainPage.module.scss";

export function MainPage() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className={styles.main__container}>
      <header>
        <Search
          placeholder="Search components"
          value={search}
          onChange={setSearch}
        />
      </header>
      <section>
        {Object.entries(groupComponents(ComponentList)).map(
          ([group, components]) => {
            const filteredComponents = components.filter((component) =>
              component.title.toLowerCase().includes(search.toLowerCase()),
            );

            if (filteredComponents.length === 0) {
              return null;
            }

            return (
              <div key={group} className={styles.main__grid__group}>
                <h2 className={styles.main__grid__title}>{group}</h2>
                <div className={styles.main__grid}>
                  {filteredComponents.map((component) => (
                    <MainItem component={component} key={component.path} />
                  ))}
                </div>
              </div>
            );
          },
        )}
      </section>
    </div>
  );
}
