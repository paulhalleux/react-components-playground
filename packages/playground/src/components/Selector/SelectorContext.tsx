import React, { createContext, PropsWithChildren } from "react";

import { RegisterFn, Selectable } from "../../types/selector";

type SelectorContextValue = {
  selectables: Selectable[];
  selected: Selectable[];
  register: RegisterFn;
  select: (selectable: Selectable) => void;
  unselect: (selectable: string) => void;
};

const defaultValue: SelectorContextValue = {
  selectables: [],
  selected: [],
  register: () => () => {},
  select: () => {},
  unselect: () => {},
};

export const SelectorContext =
  createContext<SelectorContextValue>(defaultValue);

export function SelectorProvider({ children }: PropsWithChildren) {
  const [selectables, setSelectables] = React.useState<Selectable[]>([]);
  const [selected, setSelected] = React.useState<Selectable[]>([]);

  const register: RegisterFn = (selectable) => {
    setSelectables((prev) => [...prev, selectable]);
    return () => unregister(selectable.id);
  };

  const unregister = (selectable: string) => {
    setSelectables((prev) => prev.filter((s) => s.id !== selectable));
  };

  const select = (selectable: Selectable) => {
    setSelected((prev) => [...prev, selectable]);
  };

  const unselect = (selectable: string) => {
    setSelected((prev) => prev.filter((s) => s.id !== selectable));
  };

  return (
    <SelectorContext.Provider
      value={{
        selectables,
        selected,
        register,
        select,
        unselect,
      }}
    >
      {children}
    </SelectorContext.Provider>
  );
}

export function useSelectorContext() {
  return React.useContext(SelectorContext);
}
