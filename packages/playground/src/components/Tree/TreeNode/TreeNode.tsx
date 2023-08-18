import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../../types";
import { ChevronDownIcon, ChevronRightIcon } from "../../Icons";
import { useTreeContext } from "../tree-context";

import styles from "./TreeNode.module.scss";

export type TreeNodeAddonVisibility = "hover" | "always";
export type TreeNodeProps = PropsWithChildren<{
  /**
   * Unique identifier for the node
   */
  id: string;
  /**
   * Icon to display before the label
   */
  icon?: React.ReactNode;
  /**
   * Label to display
   */
  label: React.ReactNode;
  /**
   * Addon to display after the label
   */
  addon?: React.ReactNode;
  /**
   * Visibility of the addon
   */
  addonVisibility?: TreeNodeAddonVisibility;
}> &
  BaseProps;

export function TreeNode({
  children,
  id,
  icon,
  label,
  className,
  addon,
  addonVisibility = "hover",
  ...rest
}: TreeNodeProps) {
  const { isExpanded, onExpand, onNodeClick, onNodeDoubleClick } =
    useTreeContext();

  const onDoubleClick = () => {
    onExpand(id);
    onNodeDoubleClick?.(id);
  };

  const onExpandButtonClick = () => onExpand(id);

  return (
    <div className={clsx(styles.tree__node, className)} {...rest}>
      <div
        role="treeitem"
        onClick={() => onNodeClick?.(id)}
        onDoubleClick={onDoubleClick}
        aria-expanded={!!children}
        id={id}
        className={clsx(styles.tree__node__label, {
          [styles["tree__node__label--hold"]]: !children,
        })}
      >
        {children && (
          <button
            onClick={onExpandButtonClick}
            className={styles.tree__node__expand}
          >
            {isExpanded(id) ? (
              <ChevronDownIcon size={14} />
            ) : (
              <ChevronRightIcon size={14} />
            )}
          </button>
        )}
        <div className={styles.tree__node__text}>
          {icon}
          {label}
        </div>
        {addon && (
          <div
            className={clsx(styles.tree__node__addon, {
              [styles["tree__node__addon--hover"]]: addonVisibility === "hover",
            })}
          >
            {addon}
          </div>
        )}
      </div>
      {children && isExpanded(id) && (
        <div className={styles.tree__node__children}>{children}</div>
      )}
    </div>
  );
}
