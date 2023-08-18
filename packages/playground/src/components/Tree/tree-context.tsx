import React, { createContext, PropsWithChildren } from "react";

import { TreeActionProps } from "./Tree";

type TreeContextType = {
  expanded: string[];
  onExpand: (id: string) => void;
  isExpanded: (id: string) => boolean;
  orderedNodes?: string[];
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
};

export const TreeContext = createContext<TreeContextType>(defaultValues);

type TreeProviderProps = PropsWithChildren<{
  expanded: string[];
  setExpanded: React.Dispatch<React.SetStateAction<string[]>>;
}> &
  TreeActionProps;

export function TreeProvider({
  children,
  expanded,
  setExpanded,
  ...rest
}: TreeProviderProps) {
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

  return (
    <TreeContext.Provider
      value={{ expanded, onExpand, isExpanded, orderedNodes, ...rest }}
    >
      {children}
    </TreeContext.Provider>
  );
}

export function useTreeContext() {
  return React.useContext(TreeContext);
}
