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
  const {
    selected,
    orderedNodes,
    isExpanded,
    onExpand,
    onNodeClick,
    onNodeDoubleClick,
  } = useTreeContext();

  const onDoubleClick = (event: React.MouseEvent) => {
    onExpand(id);
    onNodeDoubleClick?.(id, event);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") return;

    event.preventDefault();
    event.stopPropagation();

    if (event.key === "Enter") {
      onNodeClick?.(id, {} as React.MouseEvent);
    } else if (
      (event.key === "ArrowRight" ||
        event.key === "ArrowLeft" ||
        event.key === " ") &&
      children
    ) {
      onExpand(id);
    }

    if (event.key === "ArrowDown") {
      const index = orderedNodes?.indexOf(id);
      const nextNode = orderedNodes?.[index! + 1];
      if (nextNode) {
        const nextNodeElement = document.getElementById(nextNode);
        nextNodeElement?.focus();
      }
    } else if (event.key === "ArrowUp") {
      const index = orderedNodes?.indexOf(id);
      const prevNode = orderedNodes?.[index! - 1];
      if (prevNode) {
        const prevNodeElement = document.getElementById(prevNode);
        prevNodeElement?.focus();
      }
    }
  };

  const onExpandButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    onExpand(id);
  };

  return (
    <div className={clsx(styles.tree__node, className)} {...rest}>
      <div
        data-node-id={id}
        role="treeitem"
        tabIndex={0}
        onClick={(event) => onNodeClick?.(id, event)}
        onDoubleClick={onDoubleClick}
        onKeyDown={onKeyDown}
        aria-expanded={!!children}
        id={id}
        className={clsx(styles.tree__node__label, {
          [styles["tree__node__label--hold"]]: !children,
          [styles["tree__node__label--selected"]]: selected?.includes(id),
        })}
      >
        {children && (
          <button
            tabIndex={-1}
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
