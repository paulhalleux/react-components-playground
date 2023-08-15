import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import { NavigationItem } from "./NavigationItem";

import styles from "./Navigation.module.scss";

export type NavigationSize = "small" | "large";
export type NavigationProps = PropsWithChildren<{
  /**
   * Size of the navigation
   */
  size?: NavigationSize;
}> &
  BaseProps;

export function Navigation({
  children,
  className,
  size = "large",
  ...rest
}: NavigationProps) {
  return (
    <nav
      className={clsx(
        styles.navigation,
        styles[`navigation--${size}`],
        className,
      )}
      {...rest}
    >
      {children}
    </nav>
  );
}

Navigation.Link = NavigationItem;
