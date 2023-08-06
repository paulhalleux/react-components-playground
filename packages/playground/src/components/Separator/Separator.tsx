import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Separator.module.scss";

export type SeparatorOrientation = "horizontal" | "vertical";
export type SeparatorProps = {
  /**
   * The orientation of the separator.
   */
  orientation?: SeparatorOrientation;
} & BaseProps;

export function Separator({
  orientation = "horizontal",
  className,
  ...rest
}: SeparatorProps) {
  return (
    <div
      className={clsx(
        styles.separator,
        styles[`separator--${orientation}`],
        className,
      )}
      {...rest}
    />
  );
}
