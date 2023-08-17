import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../../types";

import styles from "../Button.module.scss";

export type ButtonGroupOrientation = "horizontal" | "vertical";
export type ButtonGroupProps = PropsWithChildren<{
  /**
   * The orientation of the button group.
   */
  orientation?: ButtonGroupOrientation;
}> &
  BaseProps;

export function ButtonGroup({
  children,
  orientation = "horizontal",
  className,
}: ButtonGroupProps) {
  return (
    <div
      className={clsx(
        styles.button__group,
        styles[`button__group--${orientation}`],
        className,
      )}
    >
      {children}
    </div>
  );
}
