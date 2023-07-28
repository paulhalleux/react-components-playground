import { Theme, ThemeType } from "../theme";

/**
 * Get the system theme
 * @returns {Theme} The system theme
 */
export function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? ThemeType.Dark
    : ThemeType.Light;
}
