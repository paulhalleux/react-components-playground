import React from "react";
import clsx from "clsx";

import { CloseButton } from "../CloseButton";

import styles from "./Badge.module.scss";

export type BadgeProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  closeable?: boolean;
  onClose?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "default"
    | "warning"
    | "danger"
    | "success"
    | "info"
    | "ghost";
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
        <CloseButton size="small" variant="ghost" onClick={onClose} />
      )}
    </span>
  );
}
