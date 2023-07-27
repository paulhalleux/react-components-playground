import { Theme, ThemeType } from "../../../playground/src/theme/theme-context";

/**
 * Get the system theme
 * @returns {Theme} The system theme
 */
export function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ThemeType.Dark
    : ThemeType.Light;
}
