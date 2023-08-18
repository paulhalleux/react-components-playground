import React, { createContext, PropsWithChildren } from "react";

import { TreeActionProps } from "./Tree";

type TreeContextType = {
  expanded: string[];
  onExpand: (id: string) => void;
  isExpanded: (id: string) => boolean;
} & TreeActionProps;

const defaultValues: TreeContextType = {
  expanded: [],
  onExpand: () => {},
  isExpanded: () => false,
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

  return (
    <TreeContext.Provider value={{ expanded, onExpand, isExpanded, ...rest }}>
      {children}
    </TreeContext.Provider>
  );
}

export function useTreeContext() {
  return React.useContext(TreeContext);
}
