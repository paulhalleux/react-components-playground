import React, { PropsWithChildren, ReactNode } from "react";
import clsx from "clsx";

import { BaseProps } from "../../../types";
import { useContextMenu } from "../context-menu-context";

import styles from "../ContextMenu.module.scss";

export type ContextMenuItemVariant = "default" | "danger";
export type ContextMenuItemProps = PropsWithChildren<{
  /**
   * The click handler of the item.
   */
  onClick?: (event: React.MouseEvent) => void;
  /**
   * The variant of the item.
   */
  variant?: ContextMenuItemVariant;
  /**
   * The addon of the item.
   */
  addon?: ReactNode;
  /**
   * id of the item
   */
  id?: string;
  /**
   * Whether the item is unselectable.
   */
  unselectable?: boolean;
}> &
  BaseProps;

export function ContextMenuItem({
  children,
  className,
  variant = "default",
  addon,
  id,
  onClick,
  unselectable,
  ...rest
}: ContextMenuItemProps) {
  const { onItemSelect } = useContextMenu();

  return (
    <div
      className={clsx(
        styles["context-menu__item"],
        styles[`context-menu__item--${variant}`],
        addon && styles["context-menu__item--with-addon"],
      )}
      onClick={
        !unselectable ? (event) => onItemSelect(id, event, onClick) : undefined
      }
      {...rest}
    >
      {addon && (
        <span className={styles["context-menu__item__addon-container"]}>
          {addon}
        </span>
      )}
      <span className={className}>{children}</span>
    </div>
  );
}
