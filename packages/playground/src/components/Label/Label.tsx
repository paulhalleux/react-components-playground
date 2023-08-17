import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Label.module.scss";

export type LabelSize = "small" | "medium" | "large";
export type LabelProps = PropsWithChildren<{
  /**
   * The id of the input the label is for.
   */
  htmlFor?: string;
  /**
   * Whether the input is required.
   */
  required?: boolean;
  /**
   * The size of the label.
   */
  size?: LabelSize;
  /**
   * Whether the label is selectable.
   */
  selectable?: boolean;
}> &
  BaseProps;

export function Label({
  htmlFor,
  required = false,
  children,
  className,
  selectable,
  size = "small",
  ...rest
}: LabelProps) {
  return (
    <label
      className={clsx(
        styles.label,
        styles[`label--${size}`],
        {
          [styles["label--selectable"]]: selectable,
        },
        className,
      )}
      htmlFor={htmlFor}
      {...rest}
    >
      {children} {required && <span className={styles.label__required}>*</span>}
    </label>
  );
}
