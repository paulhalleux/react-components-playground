import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Badge.module.scss";

export type BadgeShape = "default" | "pill";
export type BadgeSize = "small" | "large";
export type BadgeState =
  | "default"
  | "secondary"
  | "info"
  | "primary"
  | "success"
  | "warning"
  | "danger";

export type BadgeProps = PropsWithChildren<{
  /**
   * The size of the badge.
   */
  size?: BadgeSize;
  /**
   * The state of the badge.
   */
  state?: BadgeState;
  /**
   * The shape of the badge.
   */
  shape?: BadgeShape;
  /**
   * The click handler.
   */
  onClick?: () => void;
}> &
  BaseProps;

export function Badge({
  children,
  size = "large",
  state = "default",
  shape = "default",
  onClick,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      onClick={onClick}
      role={onClick ? "button" : undefined}
      className={clsx(
        styles.badge,
        styles[`badge--size-${size}`],
        styles[`badge--state-${state}`],
        styles[`badge--shape-${shape}`],
        {
          [styles["badge--clickable"]]: onClick,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
