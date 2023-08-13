import { PropsWithChildren } from "react";
import clsx from "clsx";

import { SidebarGroup } from "./SidebarGroup";
import { SidebarItem } from "./SidebarItem";

import styles from "./Sidebar.module.scss";

type SidebarProps = PropsWithChildren<{
  className?: string;
  contentClassName?: string;
}>;

export function Sidebar({
  children,
  className,
  contentClassName,
}: SidebarProps) {
  return (
    <div className={clsx(styles.sidebar, className)}>
      <div className={clsx(styles.sidebar__content, contentClassName)}>
        {children}
      </div>
    </div>
  );
}

Sidebar.Item = SidebarItem;
Sidebar.Group = SidebarGroup;
