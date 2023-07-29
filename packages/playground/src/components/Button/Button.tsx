import { PropsWithChildren } from "react";
import clsx from "clsx";

import styles from "./Button.module.scss";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonVariant = "default" | "ghost";

export type ButtonProps = PropsWithChildren<{
  onClick?: () => void;
  variant?: ButtonVariant;
  icon?: boolean;
  className?: string;
  size?: ButtonSize;
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
