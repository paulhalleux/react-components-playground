import { createContext, PropsWithChildren, useContext, useMemo } from "react";

import { StorageKeys } from "../constants/storage-keys";
import { useStoreState } from "../hooks";
import { RecursiveFull, ThemeConfiguration } from "../types";
import { merge } from "../utils/object";
import { getSystemTheme } from "../utils/theme";

import { DefaultThemeConfiguration } from "./default-theme-configuration";
import { useConfiguration } from "./use-configuration";

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
  configuration?: ThemeConfiguration;
};

const defaultValue: ThemeContextType = {
  themeType: ThemeType.System,
  theme: getSystemTheme(),
  setTheme: () => {},
  configuration: DefaultThemeConfiguration,
};

export const ThemeContext = createContext<ThemeContextType>(defaultValue);

type ThemeProviderProps = PropsWithChildren<{
  configuration?: ThemeConfiguration;
}>;

export function ThemeProvider({
  children,
  configuration = defaultValue.configuration!,
}: ThemeProviderProps) {
  const [themeType, setThemeType] = useStoreState<ThemeType>(
    StorageKeys.Theme,
    defaultValue.theme,
  );

  const theme = useMemo(
    () => (themeType === ThemeType.System ? getSystemTheme() : themeType),
    [themeType],
  );

  useConfiguration(
    merge(
      defaultValue.configuration,
      configuration,
    ) as RecursiveFull<ThemeConfiguration>,
    theme,
  );

  return (
    <ThemeContext.Provider
      value={{
        themeType: ThemeType.System,
        theme: theme,
        setTheme: setThemeType,
      }}
    >
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
