import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Flex, Input } from "@paulhalleux/react-playground";

import { SidebarTrigger } from "../../../components/Documentation/SidebarTrigger";
import { groupComponents } from "../../../utils/components";
import { ComponentDocumentations } from "../../../utils/documentation";
import { useComponentsSidebar } from "../use-components-sidebar";

import { MainItem } from "./MainItem";

import styles from "./MainPage.module.scss";

export function MainPage() {
  const [search, setSearch] = useState<string>("");
  const { sidebarItems } = useComponentsSidebar();

  return (
    <div className={styles.main__container}>
      <Helmet title="Components" />
      <Flex alignItems="center" gap={12}>
        <SidebarTrigger sidebarItems={sidebarItems} />
        <Input
          placeholder="Search components"
          value={search}
          onChange={setSearch}
        />
      </Flex>
      <section>
        {Object.entries(groupComponents(ComponentDocumentations)).map(
          ([key, group]) => {
            const filteredComponents = group.components.filter(
              (component) =>
                component.title.toLowerCase().includes(search.toLowerCase()) &&
                component.status !== "todo",
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
                      <MainItem component={component} key={component.id} />
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
