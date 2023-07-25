import React from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "@paulhalleux/react-playground";
import clsx from "clsx";

import { ComponentMeta } from "../../../../docs/__generated__/components";
import { getComponentPath } from "../../../utils/path";

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
        {components.map(
          ({ title, path, status }: ComponentMeta) =>
            title && (
              <li key={path} className={styles.sidebar__group_item}>
                <NavLink
                  className={({ isActive }) => clsx(isActive && styles.active)}
                  to={path || `/components/${getComponentPath(title)}`}
                >
                  {title}
                </NavLink>
                {(status || "done") !== "done" && (
                  <Badge
                    size="small"
                    variant={status === "todo" ? "warning" : "default"}
                  >
                    {status}
                  </Badge>
                )}
              </li>
            ),
        )}
      </ul>
    </>
  );
}
