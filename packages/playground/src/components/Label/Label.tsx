import { PropsWithChildren } from "react";

import { BaseProps } from "../../types";

import styles from "./Label.module.scss";

export type LabelProps = PropsWithChildren<{
  /**
   * The id of the input the label is for.
   */
  htmlFor?: string;
  /**
   * Whether the input is required.
   */
  required?: boolean;
}> &
  BaseProps;

export function Label({ htmlFor, required, children }: LabelProps) {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children} {required && <span className={styles.label__required}>*</span>}
    </label>
  );
}
