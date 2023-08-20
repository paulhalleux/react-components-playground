import { ReactNode } from "react";
import clsx from "clsx";

import { Popover, PopoverProps } from "../Popover";

import styles from "./Tooltip.module.scss";

export type TooltipVariant = "default" | "secondary";
export type TooltipProps = Omit<PopoverProps, "trigger" | "content"> & {
  /**
   * The content of the tooltip.
   */
  variant?: TooltipVariant;
  /**
   * The content of the tooltip.
   */
  content: ReactNode;
};

export function Tooltip({
  content,
  dataTestId,
  className,
  variant = "default",
  delay = 300,
  noPointerEvents,
  ...rest
}: TooltipProps) {
  return (
    <Popover
      trigger="hover"
      delay={delay}
      noPointerEvents={noPointerEvents}
      content={
        <div
          data-test-id={dataTestId}
          className={clsx(
            styles.tooltip,
            styles[`tooltip--${variant}`],
            className,
          )}
        >
          {content}
        </div>
      }
      dataTestId={dataTestId}
      {...rest}
    />
  );
}
