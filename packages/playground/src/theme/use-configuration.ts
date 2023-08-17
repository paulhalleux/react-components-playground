import { useEffect } from "react";
import kebabCase from "lodash/kebabCase";

import { RecursiveFull, ThemeConfiguration } from "../types";

export function useConfiguration(
  configuration: RecursiveFull<ThemeConfiguration>,
) {
  useEffect(() => {
    document.body.classList.add("no-transition");

    // colors
    Object.entries(configuration.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--color-${kebabCase(key)}`,
        value.join(","),
      );
    });

    // constants
    Object.entries(configuration.constants).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--constant-${kebabCase(key)}`,
        value.toString(),
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

    const to = setTimeout(() => {
      document.body.classList.remove("no-transition");
    }, 1000);

    return () => clearTimeout(to);
  }, [configuration]);
}
