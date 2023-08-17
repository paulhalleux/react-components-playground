import React, { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { Loader } from "../Loader";

import { ButtonGroup } from "./ButtonGroup";
import { IconButton } from "./IconButton";

import styles from "./Button.module.scss";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonVariant =
  | "default"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "primary";

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
   * The size of the button.
   */
  size?: ButtonSize;
  /**
   * Whether the button is loading.
   */
  loading?: boolean;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * The type of the button.
   */
  type?: "button" | "submit" | "reset";
  /**
   * Whether the button is ghost.
   */
  ghost?: boolean;
}> &
  BaseProps;

export function Button({
  children,
  onClick,
  variant = "default",
  className,
  size = "medium",
  disabled = false,
  loading = false,
  ghost = false,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={clsx(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        {
          [styles[`button--ghost`]]: ghost,
        },
        className,
      )}
      {...rest}
    >
      {loading ? (
        <div className={styles.button__loader}>
          <span className={styles.label}>{children}</span>
          <Loader size="small" className={styles.loader} />
        </div>
      ) : (
        children
      )}
    </button>
  );
}

Button.Icon = IconButton;
Button.Group = ButtonGroup;
