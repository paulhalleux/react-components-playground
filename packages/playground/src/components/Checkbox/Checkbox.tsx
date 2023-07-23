import React from "react";
import clsx from "clsx";

import styles from "./Checkbox.module.scss";

export type CheckboxProps = {
  id: string;
  name: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  variant?: "default" | "ghost";
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
