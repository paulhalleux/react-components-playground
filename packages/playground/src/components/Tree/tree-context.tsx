import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

import { TreeActionProps } from "./Tree";

import styles from "./Tree.module.scss";

type TreeContextType = {
  expanded: string[];
  onExpand: (id: string) => void;
  isExpanded: (id: string) => boolean;
  orderedNodes?: string[];
  selected?: string[];
  onSelectionChange?: (selected: string[]) => void;
} & TreeActionProps;

const defaultValues: TreeContextType = {
  expanded: [],
  onExpand: () => {},
  isExpanded: () => false,
  orderedNodes: [],
  onNodeCollapse: () => {},
  onNodeExpand: () => {},
  onNodeClick: () => {},
  onNodeDoubleClick: () => {},
  selected: [],
  onSelectionChange: () => {},
};

export const TreeContext = createContext<TreeContextType>(defaultValues);

type TreeProviderProps = PropsWithChildren<{
  id?: string;
  name?: string;
  selectable?: boolean;
  selected?: string[];
  onSelectionChange?: (selected: string[]) => void;
}> &
  TreeActionProps;

export function TreeProvider({
  id,
  name,
  children,
  selectable,
  selected,
  onSelectionChange,
  onNodeClick,
  ...rest
}: TreeProviderProps) {
  const [selectedNodes, setSelectedNodes] = React.useState<string[]>(
    selected || [],
  );
  const [expanded, setExpanded] = useState<string[]>([]);

  const onExpand = React.useCallback((id: string) => {
    setExpanded((prev) => {
      if (prev.includes(id)) {
        rest.onNodeCollapse?.(id);
        return prev.filter((item) => item !== id);
      }

      rest.onNodeExpand?.(id);
      return [...prev, id];
    });
  }, []);

  const isExpanded = React.useCallback(
    (id: string) => {
      return expanded.includes(id);
    },
    [expanded],
  );

  const orderedNodes = React.useMemo(() => {
    const Children = React.Children.toArray(children);
    const orderedNodes: string[] = [];

    const traverse = (children: React.ReactNode) => {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          orderedNodes.push(child.props.id);
          if (expanded.includes(child.props.id) && child.props.children) {
            traverse(child.props.children);
          }
        }
      });
    };

    traverse(Children);

    return orderedNodes;
  }, [children, expanded]);

  const onSelectionChangeCallback = React.useCallback(
    (selected: string[]) => {
      setSelectedNodes(selected);
      onSelectionChange?.(selected);
    },
    [onSelectionChange],
  );

  const onClick = React.useCallback(
    (id: string, event: React.MouseEvent) => {
      onNodeClick?.(id, event);
      if (selectable) {
        if (selected?.includes(id) && event.ctrlKey) {
          onSelectionChangeCallback?.(selected.filter((item) => item !== id));
        } else if (event.ctrlKey) {
          onSelectionChangeCallback?.([...(selected || []), id]);
        } else {
          onSelectionChangeCallback?.([id]);
        }
      }
    },
    [onNodeClick, selectable, onSelectionChangeCallback, selected],
  );

  useEffect(() => {
    if (!selectable) {
      setSelectedNodes([]);
    }
  }, [selectable]);

  return (
    <TreeContext.Provider
      value={{
        expanded,
        onExpand,
        isExpanded,
        orderedNodes,
        onNodeClick: onClick,
        selected: selectedNodes,
        onSelectionChange: onSelectionChangeCallback,
        ...rest,
      }}
    >
      {selectable && (
        <input
          id={id}
          name={name}
          type="text"
          className={styles["tree__backing-input"]}
          placeholder="Search"
          value={selected ? selected.join(",") : ""}
          readOnly
        />
      )}
      {children}
    </TreeContext.Provider>
  );
}

export function useTreeContext() {
  return React.useContext(TreeContext);
}
