import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Badge.module.scss";

export type BadgeShape = "default" | "pill";
export type BadgeSize = "small" | "large";
export type BadgeVariant =
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
   * The variant of the badge.
   */
  variant?: BadgeVariant;
  /**
   * The shape of the badge.
   */
  shape?: BadgeShape;
  /**
   * The click handler.
   */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}> &
  BaseProps;

export function Badge({
  children,
  size = "large",
  shape = "default",
  variant = "default",
  onClick,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      onClick={onClick}
      role={onClick ? "button" : undefined}
      contentEditable={false}
      className={clsx(
        styles.badge,
        styles[`badge--size-${size}`],
        styles[`badge--variant-${variant}`],
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
