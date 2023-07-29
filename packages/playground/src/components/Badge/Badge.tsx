import React from "react";
import clsx from "clsx";

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

export type BadgeProps = {
  children: React.ReactNode;
  size?: BadgeSize;
  closeable?: boolean;
  onClose?: () => void;
  variant?: BadgeVariant;
  pill?: boolean;
  onClick?: () => void;
};

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
