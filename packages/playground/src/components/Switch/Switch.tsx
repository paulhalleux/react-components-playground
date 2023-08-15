import React from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { Label } from "../Label";

import styles from "./Switch.module.scss";

export type SwitchSize = "small" | "medium" | "large";
export type SwitchProps = {
  /**
   * The id of the switch.
   */
  id: string;
  /**
   * The name of the switch.
   */
  name: string;
  /**
   * Callback fired when the switch is changed.
   */
  onChange?: (value: boolean) => void;
  /**
   * Whether the switch is checked.
   */
  checked?: boolean;
  /**
   * Whether the switch is disabled.
   */
  disabled?: boolean;
  /**
   * The label of the switch.
   */
  label?: React.ReactNode;
  /**
   * Whether the switch is required.
   */
  required?: boolean;
  /**
   * The size of the switch.
   */
  size?: SwitchSize;
} & BaseProps;

export function Switch({
  id,
  name,
  checked,
  onChange,
  label,
  className,
  disabled,
  required = false,
  size = "medium",
  ...rest
}: SwitchProps) {
  return (
    <label
      className={clsx(
        styles.switch,
        styles[`switch--${size}`],
        {
          [styles[`switch--disabled`]]: disabled,
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
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <div
        className={clsx(styles.switch__slider, {
          [styles[`switch__slider--checked`]]: checked,
        })}
      />
      {label && (
        <Label required={required} size={size} htmlFor={id}>
          {label}
        </Label>
      )}
    </label>
  );
}
