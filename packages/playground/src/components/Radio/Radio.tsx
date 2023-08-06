import React from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";
import { Label } from "../Label";

import styles from "./Radio.module.scss";

export type RadioVariant = "default";
export type RadioSize = "small" | "medium" | "large";
export type RadioProps = {
  /**
   * The id of the radio.
   */
  id: string;
  /**
   * The name of the radio.
   */
  name: string;
  /**
   * The value of the radio.
   */
  value: string;
  /**
   * The label of the radio.
   */
  label: React.ReactNode;
  /**
   * Whether the radio is checked.
   */
  selected: string;
  /**
   * Whether the radio is required.
   */
  required?: boolean;
  /**
   * Callback fired when the radio is changed.
   */
  onChange: (selected: string) => void;
  /**
   * The variant of the radio.
   */
  variant?: RadioVariant;
  /**
   * The size of the radio.
   */
  size?: RadioSize;
} & BaseProps;

export function Radio({
  label,
  selected,
  onChange,
  variant = "default",
  size = "medium",
  className,
  required = false,
  value,
  name,
  id,
  ...rest
}: RadioProps) {
  return (
    <label
      className={clsx(
        styles.radio,
        styles[`radio--${variant}`],
        styles[`radio--${size}`],
        className,
      )}
      {...rest}
    >
      <input
        name={name}
        id={id}
        type="radio"
        value={value}
        checked={selected === value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div
        className={clsx(styles.radio__box, {
          [styles["radio__box--checked"]]: selected === value,
        })}
      />
      <Label
        htmlFor={id}
        className={styles.label}
        required={required}
        size={size}
      >
        {label}
      </Label>
    </label>
  );
}
