import React from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { Label } from "../Label";

import styles from "./Checkbox.module.scss";

export type CheckboxVariant = "default";
export type CheckboxSize = "small" | "medium" | "large";
export type CheckboxProps = {
  /**
   * The id of the checkbox.
   */
  id: string;
  /**
   * The name of the checkbox.
   */
  name: string;
  /**
   * The label of the checkbox.
   */
  label?: React.ReactNode;
  /**
   * Whether the checkbox is checked.
   */
  checked: boolean;
  /**
   * Whether the checkbox is required.
   */
  required?: boolean;
  /**
   * Whether the checkbox is disabled.
   */
  disabled?: boolean;
  /**
   * Callback fired when the checkbox is changed.
   */
  onChange: (checked: boolean) => void;
  /**
   * The variant of the checkbox.
   */
  variant?: CheckboxVariant;
  /**
   * The size of the checkbox.
   */
  size?: CheckboxSize;
} & BaseProps;

export function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  variant = "default",
  size = "medium",
  className,
  required = false,
  name,
  id,
  ...rest
}: CheckboxProps) {
  return (
    <label
      className={clsx(
        styles.checkbox,
        styles[`checkbox--${variant}`],
        styles[`checkbox--${size}`],
        {
          [styles["checkbox--disabled"]]: disabled,
        },
        className,
      )}
      {...rest}
    >
      <input
        name={name}
        id={id}
        disabled={disabled}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={clsx(styles.checkbox__box, {
          [styles["checkbox__box--checked"]]: checked,
        })}
      />
      {label && (
        <Label
          htmlFor={id}
          className={styles.label}
          required={required}
          size={size}
        >
          {label}
        </Label>
      )}
    </label>
  );
}
