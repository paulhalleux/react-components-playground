import { PropsWithChildren, useState } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import { TreeProvider } from "./tree-context";
import { TreeNode } from "./TreeNode";

import styles from "./Tree.module.scss";

export type TreeActionProps = {
  /**
   * Callback when a node is clicked
   */
  onNodeClick?: (id: string) => void;
  /**
   * Callback when a node is double clicked
   */
  onNodeDoubleClick?: (id: string) => void;
  /**
   * Callback when a node is expanded
   */
  onNodeExpand?: (id: string) => void;
  /**
   * Callback when a node is collapsed
   */
  onNodeCollapse?: (id: string) => void;
};

export type TreeProps = PropsWithChildren<TreeActionProps> & BaseProps;

export function Tree({
  children,
  className,
  onNodeClick,
  onNodeDoubleClick,
  onNodeExpand,
  onNodeCollapse,
  ...rest
}: TreeProps) {
  const [expanded, setExpanded] = useState<string[]>([]);

  return (
    <div className={clsx(styles.tree, className)} {...rest}>
      <TreeProvider
        expanded={expanded}
        setExpanded={setExpanded}
        onNodeClick={onNodeClick}
        onNodeDoubleClick={onNodeDoubleClick}
        onNodeExpand={onNodeExpand}
        onNodeCollapse={onNodeCollapse}
      >
        {children}
      </TreeProvider>
    </div>
  );
}

Tree.Node = TreeNode;
