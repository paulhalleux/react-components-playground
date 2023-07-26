import React from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "@paulhalleux/react-playground";
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
    <>
      <h2 className={styles.sidebar__group_title}>{title}</h2>
      <ul className={styles.sidebar__group_items}>
        {components.map((component: ComponentMeta) => (
          <li key={component.fileName} className={styles.sidebar__group_item}>
            <NavLink
              className={({ isActive }) => clsx(isActive && styles.active)}
              to={Routes.Component(component)}
            >
              {component.title}
            </NavLink>
            {(component.status || "done") !== "done" && (
              <Badge
                size="small"
                variant={component.status === "todo" ? "warning" : "default"}
              >
                {component.status}
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
