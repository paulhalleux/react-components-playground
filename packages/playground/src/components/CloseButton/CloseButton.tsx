import React from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { XIcon } from "../Icons";

import styles from "./CloseButton.module.scss";

export type CloseButtonVariant = "default" | "ghost";
export type CloseButtonSize = "small" | "medium" | "large" | "x-large";

export type CloseButtonProps = {
  /**
   * Callback fired when the button is clicked.
   */
  onClick?: () => void;
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;
  /**
   * The variant of the button.
   */
  variant?: CloseButtonVariant;
  /**
   * The size of the button.
   */
  size?: CloseButtonSize;
} & BaseProps;

const Sizes = {
  small: 12,
  medium: 15,
  large: 17,
  "x-large": 20,
};

export function CloseButton({
  disabled = false,
  onClick,
  variant = "default",
  size = "small",
  className,
  ...rest
}: CloseButtonProps) {
  const iconSize = Sizes[size];

  return (
    <button
      type="button"
      className={clsx(
        styles["close-button"],
        styles[`close-button--${size}`],
        styles[`close-button--${variant}`],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <XIcon size={iconSize} />
    </button>
  );
}
