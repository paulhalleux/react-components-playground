import React from "react";

import { Label } from "../../Label";
import { useActivityChart } from "../activity-chart-context";
import { ActivityIndicator } from "../ActivityIndicator";

import styles from "./ActivityChartLegend.module.scss";

export function ActivityChartLegend() {
  const { variant } = useActivityChart();

  return (
    <div className={styles["activity-chart__legend"]}>
      <Label>Low</Label>
      <div className={styles["activity-chart__legend__content"]}>
        <ActivityIndicator active={false} variant={variant} />
        <ActivityIndicator active={true} intensity={2} variant={variant} />
        <ActivityIndicator active={true} intensity={4} variant={variant} />
        <ActivityIndicator active={true} intensity={6} variant={variant} />
        <ActivityIndicator active={true} intensity={8} variant={variant} />
        <ActivityIndicator active={true} intensity={10} variant={variant} />
      </div>
      <Label>High</Label>
    </div>
  );
}
