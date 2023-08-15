import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import { HeaderActions } from "./HeaderActions";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderNavigation } from "./HeaderNavigation";

import styles from "./Header.module.scss";

export type HeaderLayout =
  | "start"
  | "3-column"
  | "2-column"
  | "centered"
  | "end"
  | "spaced";
export type HeaderProps = PropsWithChildren<{
  /**
   * Whether the header should be sticky
   */
  sticky?: boolean;
  /**
   * Whether the header should be transparent
   */
  ghost?: boolean;
  /**
   * The width of the content container
   */
  containerWidth?: number;
  /**
   * The padding of the content container
   */
  containerPadding?: number;
  /**
   * The layout of the header
   */
  layout?: HeaderLayout;
}> &
  BaseProps;

export function Header({
  children,
  sticky,
  ghost,
  className,
  containerWidth = 1400,
  containerPadding = 24,
  layout = "start",
  ...rest
}: HeaderProps) {
  return (
    <header
      className={clsx(
        styles.header,
        {
          [styles["header--sticky"]]: sticky,
          [styles["header--ghost"]]: ghost,
        },
        className,
      )}
      {...rest}
    >
      <div
        className={clsx(
          styles["header__content-container"],
          styles[`header__content-container--layout-${layout}`],
        )}
        style={{ maxWidth: containerWidth, padding: `0 ${containerPadding}px` }}
      >
        {children}
      </div>
    </header>
  );
}

Header.Logo = HeaderLogo;
Header.Navigation = HeaderNavigation;
Header.Actions = HeaderActions;
