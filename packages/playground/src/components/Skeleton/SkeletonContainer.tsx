import { PropsWithChildren } from "react";

import styles from "./Skeleton.module.scss";

export type SkeletonContainerProps = PropsWithChildren<{
  direction?: "row" | "column";
  alignItems?: "center" | "flex-start" | "flex-end";
  justifyContent?: "center" | "flex-start" | "flex-end";
  gap?: string | number;
}>;

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
