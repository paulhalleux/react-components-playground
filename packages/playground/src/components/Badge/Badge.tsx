import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { CloseButton } from "../CloseButton";

import styles from "./Badge.module.scss";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "default"
  | "warning"
  | "danger"
  | "success"
  | "info"
  | "ghost";

export type BadgeSize = "small" | "medium" | "large";

export type BadgeProps = PropsWithChildren<{
  /**
   * The size of the badge.
   */
  size?: BadgeSize;
  /**
   * Whether the badge is closeable.
   */
  closeable?: boolean;
  /**
   * Callback fired when the badge is closed.
   */
  onClose?: () => void;
  /**
   * The variant of the badge.
   */
  variant?: BadgeVariant;
  /**
   * Whether the badge is pill-shaped.
   */
  pill?: boolean;
  /**
   * Callback fired when the badge is clicked.
   */
  onClick?: () => void;
}> &
  BaseProps;

export function Badge({
  children,
  size = "medium",
  variant = "default",
  pill = false,
  onClose,
  closeable = false,
  onClick,
}: BadgeProps) {
  return (
    <span
      onClick={onClick}
      role={onClick ? "button" : undefined}
      className={clsx(
        styles.badge,
        styles[`badge--${size}`],
        styles[`badge--${variant}`],
        {
          [styles["badge--pill"]]: pill,
          [styles["badge--action"]]: !!onClick,
        },
      )}
    >
      {children}
      {closeable && (
        <CloseButton size={size} variant="ghost" onClick={onClose} />
      )}
    </span>
  );
}
