import React from "react";
import { Outlet } from "react-router";

import { ComponentList } from "../../../docs/__generated__/components";
import { groupComponents } from "../../utils/components";

import { SidebarGroup } from "./SidebarGroup";

import styles from "./PlaygroundLayout.module.scss";

export function PlaygroundLayout() {
  return (
    <section className={styles.playground__container}>
      <section className={styles.playground__sidebar}>
        <section className={styles.sidebar__content}>
          {Object.entries(groupComponents(ComponentList)).map(
            ([group, components]) => (
              <SidebarGroup
                title={components.title}
                components={components.components}
                key={group}
              />
            ),
          )}
        </section>
      </section>
      <Outlet />
    </section>
  );
}
