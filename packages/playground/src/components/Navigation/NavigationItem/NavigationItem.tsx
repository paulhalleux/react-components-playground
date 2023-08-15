import { PropsWithChildren } from "react";
import { NavLink, useInRouterContext } from "react-router-dom";
import clsx from "clsx";

import { BaseProps } from "../../../types";

import styles from "../Navigation.module.scss";

export type NavigationItemProps = PropsWithChildren<{
  /**
   * Link href to navigate to
   */
  href: string;
  /**
   * Render as a link (using react-router-dom's NavLink)
   */
  asLink?: boolean;
  /**
   * Whether the link is active
   */
  active?: boolean;
}> &
  BaseProps;

export function NavigationItem({
  children,
  asLink,
  href,
  className,
  active,
  ...rest
}: NavigationItemProps) {
  const router = useInRouterContext();
  const classNameProp = clsx(styles.navigation__item, className);

  if (asLink && router) {
    return (
      <NavLink
        to={href}
        end={href === "/"}
        className={({ isActive }) => {
          return clsx(classNameProp, {
            [styles["navigation__item--active"]]: isActive || active,
          });
        }}
        {...rest}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <a
      href={href}
      className={clsx(
        {
          [styles["navigation__item--active"]]: active,
        },
        classNameProp,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
