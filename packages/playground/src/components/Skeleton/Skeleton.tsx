import { SkeletonContainer } from "./SkeletonContainer";

import styles from "./Skeleton.module.scss";

export type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  margin?: string | number;
};

export function Skeleton({
  width = "100%",
  height = "16px",
  radius = "3px",
  margin = "0px",
}: SkeletonProps) {
  return (
    <div
      className={styles.skeleton}
      style={{
        width,
        height,
        margin,
        borderRadius: radius,
      }}
    />
  );
}

Skeleton.Container = SkeletonContainer;
