import { PropsWithChildren } from "react";

import styles from "./Label.module.scss";

export type LabelProps = PropsWithChildren<{
  htmlFor?: string;
  required?: boolean;
}>;

export function Label({ htmlFor, required, children }: LabelProps) {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children} {required && <span className={styles.label__required}>*</span>}
    </label>
  );
}
