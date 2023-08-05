import { PropsWithChildren } from "react";

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
}: SkeletonContainerProps) {
  return (
    <div
      className={styles.container}
      style={{
        justifyContent,
        flexDirection: direction,
        alignItems,
        gap,
      }}
    >
      {children}
    </div>
  );
}
