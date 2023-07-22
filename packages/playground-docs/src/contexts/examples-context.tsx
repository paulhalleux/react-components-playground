import { createContext, PropsWithChildren, useContext } from "react";

export type ExamplesContextType = {
  examples: Record<string, string>;
};

const defaultValue: ExamplesContextType = {
  examples: {},
};

export const ExamplesContext = createContext<ExamplesContextType>(defaultValue);

export function ExamplesProvider({
  children,
  examples,
}: PropsWithChildren<{ examples: Record<string, string> }>) {
  return (
    <ExamplesContext.Provider value={{ examples }}>
      {children}
    </ExamplesContext.Provider>
  );
}

export function useExamples() {
  return useContext(ExamplesContext);
}
