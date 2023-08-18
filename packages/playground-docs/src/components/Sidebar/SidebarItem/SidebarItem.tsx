import React, { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import styles from "./SidebarItem.module.scss";

type SidebarItemProps = PropsWithChildren<{
  path: string;
  disabled?: boolean;
  onClick?: () => void;
}>;

export function SidebarItem({
  path,
  disabled,
  children,
  onClick,
}: SidebarItemProps) {
  return (
    <li className={styles.sidebar__item} onClick={onClick}>
      {disabled ? (
        <span className={styles.disabled}>{children}</span>
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
