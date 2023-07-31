import { useState } from "react";
import { useLocation } from "react-use";
import { Search } from "@paulhalleux/react-playground";
import { motion } from "framer-motion";

import { ComponentList } from "../../../docs/__generated__/components";
import { groupComponents } from "../../utils/components";

import { MainItem } from "./MainItem";

import styles from "./MainPage.module.scss";

export function MainPage() {
  const { pathname } = useLocation();
  const [search, setSearch] = useState<string>("");

  return (
    <motion.div
      key={pathname}
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -15, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={styles.main__container}
    >
      <header>
        <Search
          placeholder="Search components"
          value={search}
          onChange={setSearch}
        />
      </header>
      <section>
        {Object.entries(groupComponents(ComponentList)).map(([key, group]) => {
          const filteredComponents = group.components.filter((component) =>
            component.title.toLowerCase().includes(search.toLowerCase()),
          );

          if (filteredComponents.length === 0) {
            return null;
          }

          return (
            <div key={key} className={styles.main__grid__group}>
              <h2 className={styles.main__grid__title}>{group.title}</h2>
              <div className={styles.main__grid}>
                {filteredComponents
                  .filter((component) => component.status !== "todo")
                  .map((component) => (
                    <MainItem component={component} key={component.path} />
                  ))}
              </div>
            </div>
          );
        })}
      </section>
    </motion.div>
  );
}
