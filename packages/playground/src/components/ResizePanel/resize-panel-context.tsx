import { createContext, PropsWithChildren, useContext } from "react";

import { useStoreState } from "../../hooks";

import { ResizePanelGroupDirection } from "./ResizePanelGroup";

export type ResizePanelContextType = {
  sizes: Record<string, number>;
  setSize: (id: string, size: (prev: number) => number) => void;
  direction: ResizePanelGroupDirection;
};

const defaultValue: ResizePanelContextType = {
  sizes: {},
  setSize: () => {},
  direction: "horizontal",
};

export const ResizePanelContext = createContext(defaultValue);

type ResizePanelProviderProps = PropsWithChildren<{
  id: string;
  direction: ResizePanelGroupDirection;
}>;

export function ResizePanelProvider({
  id,
  children,
  direction,
}: ResizePanelProviderProps) {
  const [sizes, setSizes] = useStoreState<Record<string, number>>(id, {});

  const setSize = (id: string, size: (prev: number) => number) => {
    setSizes((prev) => ({ ...prev, [id]: size(prev[id] ?? 0) }));
  };

  return (
    <ResizePanelContext.Provider value={{ sizes, setSize, direction }}>
      {children}
    </ResizePanelContext.Provider>
  );
}

export function useResizePanel() {
  return useContext(ResizePanelContext);
}
