import React from "react";
import clsx from "clsx";

import { CloseIcon } from "../Icons";

import styles from "./CloseButton.module.scss";

export type CloseButtonVariant = "default" | "ghost";
export type CloseButtonSize = "small" | "medium" | "large";

export type CloseButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  variant?: CloseButtonVariant;
  size?: CloseButtonSize;
};

const Sizes = {
  small: 12,
  medium: 15,
  large: 17,
};

export function CloseButton({
  disabled = false,
  onClick,
  variant = "default",
  size = "small",
}: CloseButtonProps) {
  const iconSize = Sizes[size];

  return (
    <button
      type="button"
      className={clsx(
        styles["close-button"],
        styles[`close-button--${size}`],
        styles[`close-button--${variant}`],
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <CloseIcon width={iconSize} height={iconSize} />
    </button>
  );
}
