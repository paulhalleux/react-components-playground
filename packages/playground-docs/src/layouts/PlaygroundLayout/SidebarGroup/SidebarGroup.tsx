import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { ComponentMeta } from "../../../../docs/__generated__/components";
import { Routes } from "../../../constants/routes";

import styles from "../PlaygroundLayout.module.scss";

type SidebarGroupProps = {
  title: string;
  components: ComponentMeta[];
};

export function SidebarGroup({ title, components }: SidebarGroupProps) {
  return (
    <div className={styles.sidebar__group}>
      <h2 className={styles.sidebar__group_title}>{title}</h2>
      <ul className={styles.sidebar__group_items}>
        {components.map((component: ComponentMeta) => (
          <li key={component.id} className={styles.sidebar__group_item}>
            {component.status === "todo" ? (
              <span className={styles.todo}>{component.title}</span>
            ) : (
              <NavLink
                className={({ isActive }) => clsx(isActive && styles.active)}
                to={Routes.Component(component)}
              >
                {component.title}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
