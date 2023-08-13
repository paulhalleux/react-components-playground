import React, { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./SidebarItem.module.scss";

type SidebarItemProps = PropsWithChildren<{
  path: string;
  disabled?: boolean;
}>;

export function SidebarItem({ path, disabled, children }: SidebarItemProps) {
  return (
    <li className={styles.sidebar__item}>
      {disabled ? (
        <span className={styles.todo}>{children}</span>
      ) : (
        <NavLink
          className={({ isActive }) => clsx(isActive && styles.active)}
          to={path}
        >
          {children}
        </NavLink>
      )}
    </li>
  );
}
