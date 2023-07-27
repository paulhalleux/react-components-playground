import { useEffect } from "react";
import kebabCase from "lodash/kebabCase";

import { RecursiveFull, ThemeConfiguration } from "../types";
import { rgba } from "../utils/color";

import { ThemeType } from "./theme-context";

export function useConfiguration(
  configuration: RecursiveFull<ThemeConfiguration>,
  theme: ThemeType,
) {
  useEffect(() => {
    // colors
    const baseThemeColors =
      theme === ThemeType.Light
        ? configuration.colors.light
        : configuration.colors.dark;
    Object.entries(baseThemeColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--color-${kebabCase(key)}`,
        typeof value === "string" ? rgba(value) : value.join(","),
      );
    });

    // sizes
    Object.entries(configuration.sizes).forEach(([key, value]) => {
      Object.entries(value).forEach(([subKey, subValue]) => {
        document.documentElement.style.setProperty(
          `--${kebabCase(key)}-${kebabCase(subKey)}`,
          `${subValue}px`,
        );
      });
    });
  }, [configuration, theme]);
}
