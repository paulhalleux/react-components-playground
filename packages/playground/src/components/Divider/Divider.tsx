import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Divider.module.scss";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerSeparatorProps = {
  /**
   * The orientation of the divider.
   */
  orientation?: DividerOrientation;
} & BaseProps;

export function Divider({
  orientation = "horizontal",
  className,
  ...rest
}: DividerSeparatorProps) {
  return (
    <div
      className={clsx(
        styles.divider,
        styles[`divider--${orientation}`],
        className,
      )}
      {...rest}
    />
  );
}
