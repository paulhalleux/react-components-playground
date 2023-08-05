import { BaseProps } from "../../types";

import { SkeletonContainer } from "./SkeletonContainer";

import styles from "./Skeleton.module.scss";

export type SkeletonProps = {
  /**
   * The width of the skeleton.
   */
  width?: string | number;
  /**
   * The height of the skeleton.
   */
  height?: string | number;
  /**
   * The radius of the skeleton.
   */
  radius?: string | number;
  /**
   * The margin of the skeleton.
   */
  margin?: string | number;
} & BaseProps;

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
