import React, { PropsWithChildren } from "react";

export type ContextMenuContextType = {
  id: string;
  reserveIconsSpace: boolean;
  onItemSelect: (
    id: string | undefined,
    event: React.MouseEvent,
    onClick?: (event: React.MouseEvent) => void,
  ) => void;
};

const defaultValue: ContextMenuContextType = {
  onItemSelect: () => {},
  reserveIconsSpace: false,
  id: "",
};

const ContextMenuContext =
  React.createContext<ContextMenuContextType>(defaultValue);

type ContextMenuProviderProps = PropsWithChildren<{
  onItemSelect: (
    id: string | undefined,
    event: React.MouseEvent,
    onClick?: (event: React.MouseEvent) => void,
  ) => void;
  reserveIconsSpace?: boolean;
  id: string;
}>;

export function ContextMenuProvider({
  children,
  onItemSelect,
  reserveIconsSpace = false,
  id,
}: ContextMenuProviderProps) {
  return (
    <ContextMenuContext.Provider
      value={{ onItemSelect, reserveIconsSpace, id }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
}

export function useContextMenu() {
  return React.useContext(ContextMenuContext);
}
