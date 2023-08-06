import { PropsWithChildren } from "react";
import clsx from "clsx";

import { BaseProps } from "../../types";

import styles from "./Skeleton.module.scss";

export type SkeletonContainerProps = PropsWithChildren<{
  /**
   * The direction of the skeleton container.
   */
  direction?: "row" | "column";
  /**
   * The alignment of the skeleton container.
   */
  alignItems?: "center" | "flex-start" | "flex-end";
  /**
   * The justification of the skeleton container.
   */
  justifyContent?: "center" | "flex-start" | "flex-end";
  /**
   * The gap between the skeleton items.
   */
  gap?: string | number;
}> &
  BaseProps;

export function SkeletonContainer({
  children,
  justifyContent,
  direction,
  alignItems,
  gap,
  className,
  style,
  dataTestId,
}: SkeletonContainerProps) {
  return (
    <div
      className={clsx(styles.container, className)}
      data-test-id={dataTestId}
      style={{
        justifyContent,
        flexDirection: direction,
        alignItems,
        gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
