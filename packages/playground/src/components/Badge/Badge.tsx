import React from "react";
import clsx from "clsx";

import styles from "./Badge.module.scss";

export type BadgeProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "default";
  pill?: boolean;
};

export function Badge({
  children,
  size = "medium",
  variant = "default",
  pill = false,
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
    </span>
  );
}
