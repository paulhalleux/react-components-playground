import { createContext, PropsWithChildren, useContext } from "react";

import { StorageKeys } from "../constants/storage-keys";
import { useStoreState } from "../hooks";
import { RecursiveFull, ThemeConfiguration } from "../types";
import { merge } from "../utils/object";
import { getSystemTheme } from "../utils/theme";

import { DefaultDarkThemeConfiguration } from "./configurations/default-dark-theme-configuration";
import { DefaultLightThemeConfiguration } from "./configurations/default-light-theme-configuration";
import { useConfiguration } from "./use-configuration";

export const Themes = {
  Light: DefaultLightThemeConfiguration,
  Dark: DefaultDarkThemeConfiguration,
};

export type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
  availableThemes: Record<string, ThemeConfiguration>;
};

const defaultValue: ThemeContextType = {
  theme: getSystemTheme(),
  setTheme: () => {},
  availableThemes: Themes,
};

export const ThemeContext = createContext<ThemeContextType>(defaultValue);

type ThemeProviderProps = PropsWithChildren<{
  availableThemes?: Record<string, ThemeConfiguration>;
  systemDefault?: boolean;
  defaultTheme?: string;
}>;

export function ThemeProvider({
  children,
  availableThemes = defaultValue.availableThemes,
  systemDefault = true,
  defaultTheme = "Light",
}: ThemeProviderProps) {
  const actualDefaultTheme = systemDefault ? getSystemTheme() : defaultTheme;
  const [theme, setTheme] = useStoreState<keyof typeof availableThemes>(
    StorageKeys.Theme,
    actualDefaultTheme,
  );

  useConfiguration(
    merge(
      Themes[actualDefaultTheme as keyof typeof Themes],
      availableThemes[theme],
    ) as RecursiveFull<ThemeConfiguration>,
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        availableThemes,
      }}
    >
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
