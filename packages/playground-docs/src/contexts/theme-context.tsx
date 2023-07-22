import { createContext, PropsWithChildren, useContext } from "react";

import { StorageKeys } from "../constants/storage-keys";
import { useStoreState } from "../hooks/use-store-state";
import { getSystemTheme } from "../utils/theme";

export enum ThemeType {
  Light = "light",
  Dark = "dark",
  System = "system",
}

export type Theme = Exclude<ThemeType, ThemeType.System>;

export type ThemeContextType = {
  themeType: ThemeType;
  theme: Theme;
  setTheme: (theme: ThemeType) => void;
};

const defaultValue: ThemeContextType = {
  themeType: ThemeType.System,
  theme: getSystemTheme(),
  setTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultValue);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeType, setThemeType] = useStoreState<ThemeType>(
    StorageKeys.Theme,
    defaultValue.theme,
  );

  return (
    <ThemeContext.Provider
      value={{
        themeType: ThemeType.System,
        theme: themeType === ThemeType.System ? getSystemTheme() : themeType,
        setTheme: setThemeType,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
