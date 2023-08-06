import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Button.module.scss";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonVariant = "default" | "ghost";

export type ButtonProps = PropsWithChildren<{
  /**
   * Callback fired when the button is clicked.
   */
  onClick?: () => void;
  /**
   * The variant of the button.
   */
  variant?: ButtonVariant;
  /**
   * Whether the button is icon-only.
   */
  icon?: boolean;
  /**
   * The size of the button.
   */
  size?: ButtonSize;
}> &
  BaseProps;

export function Button({
  children,
  onClick,
  variant = "default",
  icon,
  className,
  size = "medium",
  ...rest
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
      {...rest}
    >
      {children}
    </button>
  );
}
