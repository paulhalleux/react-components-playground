import React from "react";
import clsx from "clsx";

import { CloseIcon } from "../Icons";

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
};

export function Badge({
  children,
  size = "medium",
  variant = "default",
  pill = false,
  onClose,
  closeable = false,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        styles.badge,
        styles[`badge--${size}`],
        styles[`badge--${variant}`],
        {
          [styles["badge--pill"]]: pill,
        },
      )}
    >
      {children}
      {closeable && (
        <button
          type="button"
          className={styles["badge__close"]}
          onClick={onClose}
        >
          <CloseIcon width={12} height={12} />
        </button>
      )}
    </span>
  );
}
