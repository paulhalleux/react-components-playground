import React, { createContext, PropsWithChildren } from "react";

import { RegisterFn, Selectable } from "../../types";

type SelectorContextValue = {
  selectables: Selectable[];
  register: RegisterFn;
};

const defaultValue: SelectorContextValue = {
  selectables: [],
  register: () => () => {},
};

export const SelectorContext =
  createContext<SelectorContextValue>(defaultValue);

export function SelectorProvider({ children }: PropsWithChildren) {
  const [selectables, setSelectables] = React.useState<Selectable[]>([]);

  const register: RegisterFn = (selectable) => {
    setSelectables((prev) => [...prev, selectable]);
    return () => unregister(selectable.id);
  };

  const unregister = (selectable: string) => {
    setSelectables((prev) => prev.filter((s) => s.id !== selectable));
  };

  return (
    <SelectorContext.Provider
      value={{
        selectables,
        register,
      }}
    >
      {children}
    </SelectorContext.Provider>
  );
}

export function useSelectorContext() {
  return React.useContext(SelectorContext);
}