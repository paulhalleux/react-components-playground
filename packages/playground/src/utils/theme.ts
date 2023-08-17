/**
 * Get the system theme
 * @returns {Theme} The system theme
 */
export function getSystemTheme(): string {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "Dark"
    : "Light";
}
