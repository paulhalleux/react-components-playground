import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import { TreeProvider } from "./tree-context";
import { TreeNode } from "./TreeNode";

import styles from "./Tree.module.scss";

export type TreeActionProps = {
  /**
   * Callback when a node is clicked
   */
  onNodeClick?: (id: string, event: React.MouseEvent) => void;
  /**
   * Callback when a node is double-clicked
   */
  onNodeDoubleClick?: (id: string, event: React.MouseEvent) => void;
  /**
   * Callback when a node is expanded
   */
  onNodeExpand?: (id: string) => void;
  /**
   * Callback when a node is collapsed
   */
  onNodeCollapse?: (id: string) => void;
};

export type TreeSize = "small" | "large";
export type TreeProps = PropsWithChildren<{
  /**
   * Id of the tree
   */
  id?: string;
  /**
   * Name of the tree
   */
  name?: string;
  /**
   * Size of the tree
   */
  size?: TreeSize;
  /**
   * Whether the tree nodes are selectable
   */
  selectable?: boolean;
  /**
   * Selected node ids
   */
  selected?: string[];
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selected: string[]) => void;
}> &
  TreeActionProps &
  BaseProps;

export function Tree({
  id,
  name,
  children,
  className,
  onNodeClick,
  onNodeDoubleClick,
  onNodeExpand,
  onNodeCollapse,
  onSelectionChange,
  selectable,
  selected,
  size = "small",
  ...rest
}: TreeProps) {
  return (
    <div
      className={clsx(styles.tree, styles[`tree--${size}`], className)}
      {...rest}
    >
      <TreeProvider
        id={id}
        name={name}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onNodeExpand={onNodeExpand}
        onNodeCollapse={onNodeCollapse}
        selectable={selectable}
        selected={selected}
        onSelectionChange={onSelectionChange}
      >
        {children}
      </TreeProvider>
    </div>
  );
}

Tree.Node = TreeNode;
