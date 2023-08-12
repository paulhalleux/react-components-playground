import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../../types";

import styles from "../ContextMenu.module.scss";

type ContextMenuItemsProps = PropsWithChildren<{
  reserveIconsSpace?: boolean;
}> &
  BaseProps;

export function ContextMenuItems({
  children,
  reserveIconsSpace,
  className,
}: ContextMenuItemsProps) {
  return (
    <div
      className={clsx(
        styles["context-menu__items"],
        reserveIconsSpace && styles["context-menu__items--reserve-icons-space"],
        className,
      )}
    >
      {children}
    </div>
  );
}
