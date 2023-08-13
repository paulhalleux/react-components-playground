import React, { PropsWithChildren } from "react";

import styles from "./SidebarGroup.module.scss";

type SidebarGroupProps = PropsWithChildren<{
  title: string;
}>;

export function SidebarGroup({ title, children }: SidebarGroupProps) {
  return (
    <div className={styles.sidebar__group}>
      <h2 className={styles.sidebar__group_title}>{title}</h2>
      <ul className={styles.sidebar__group_items}>{children}</ul>
    </div>
  );
}
