import React from "react";
import clsx from "clsx";

import { ActivityChartVariant } from "../ActivityChart";

import styles from "./ActivityIndicator.module.scss";

export type ActivityIndicatorIntensity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ActivityIndicatorProps = {
  active: boolean;
  intensity?: ActivityIndicatorIntensity;
  variant?: ActivityChartVariant;
  style?: React.CSSProperties;
};

export function ActivityIndicator({
  active,
  intensity,
  variant = "primary",
  style,
}: ActivityIndicatorProps) {
  return (
    <div
      className={clsx(
        styles["activity-indicator"],
        styles[`activity-indicator--variant-${variant}`],
        {
          [styles["activity-indicator--active"]]: active && intensity,
        },
      )}
      style={
        {
          "--intensity": (intensity || 0) / 10,
          ...style,
        } as React.CSSProperties
      }
    />
  );
}
