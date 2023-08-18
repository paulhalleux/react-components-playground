import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Progress.module.scss";

export type ProgressSize = "small" | "medium" | "large";
export type ProgressVariant =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "primary";

export type ProgressProps = {
  /**
   * Progress value
   */
  progress: number;
  /**
   * Progress variant
   */
  variant?: ProgressVariant;
  /**
   * Progress size
   */
  size?: ProgressSize;
} & BaseProps;

export function Progress({
  progress,
  variant = "default",
  size = "medium",
  className,
  ...rest
}: ProgressProps) {
  return (
    <div
      className={clsx(
        styles.progress,
        styles[`progress--variant-${variant}`],
        styles[`progress--size-${size}`],
        className,
      )}
      {...rest}
    >
      <div className={styles.progress__bar} style={{ width: `${progress}%` }} />
    </div>
  );
}
