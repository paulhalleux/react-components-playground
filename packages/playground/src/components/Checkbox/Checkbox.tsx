import React from "react";
import clsx from "clsx";

import styles from "./Checkbox.module.scss";

export type CheckboxVariant = "default" | "ghost";
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
  label: React.ReactNode;
  /**
   * Whether the checkbox is checked.
   */
  checked: boolean;
  /**
   * Callback fired when the checkbox is changed.
   * @param checked Whether the checkbox is checked.
   */
  onChange: (checked: boolean) => void;
  /**
   * The variant of the checkbox.
   */
  variant?: CheckboxVariant;
};

export function Checkbox({
  label,
  checked,
  onChange,
  variant = "default",
}: CheckboxProps) {
  return (
    <label className={clsx(styles.checkbox, styles[`checkbox--${variant}`])}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div
        className={clsx(styles.checkbox__box, {
          [styles["checkbox__box--checked"]]: checked,
        })}
      />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
