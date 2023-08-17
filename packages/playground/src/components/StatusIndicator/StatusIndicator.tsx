import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./StatusIndicator.module.scss";

export type StatusIndicatorVariant =
  | "default"
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger";
export type StatusIndicatorProps = {
  /**
   * The variant of the status indicator
   */
  status?: StatusIndicatorVariant;
} & BaseProps;

export function StatusIndicator({
  status = "default",
  className,
  ...rest
}: StatusIndicatorProps) {
  return (
    <div
      className={clsx(
        styles["status-indicator"],
        styles[`status-indicator--${status}`],
        className,
      )}
      {...rest}
    />
  );
}
