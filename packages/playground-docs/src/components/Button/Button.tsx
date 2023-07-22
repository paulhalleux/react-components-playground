import { PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Button.module.scss";

type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant?: "default" | "ghost";
  icon?: boolean;
  className?: string;
  size?: "small" | "medium" | "large";
}>;

export function Button({
  children,
  onClick,
  variant = "default",
  icon,
  className,
  size = "medium",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        {
          [styles["button--icon"]]: icon,
        },
        className,
      )}
    >
      {children}
    </button>
  );
}
