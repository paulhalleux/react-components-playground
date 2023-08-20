import React from "react";
import clsx from "clsx";

import { useActivityChart } from "../activity-chart-context";

import { ActivityChartDay } from "./ActivityChartDay";

import styles from "./ActivityChartActivity.module.scss";

export function ActivityChartActivity() {
  const { weeks, variant } = useActivityChart();

  return (
    <div
      style={{
        gridArea: "activity",
      }}
      className={clsx(
        styles["activity-chart__activity"],
        styles[`activity-chart__activity--variant-${variant}`],
      )}
    >
      {weeks.map((week) => (
        <div
          key={`${week.week}-${week.year}`}
          className={styles["activity-chart__activity__week"]}
        >
          {week.days.map((day, index) => (
            <ActivityChartDay
              key={day?.toString() || `week_${week.week}_${index}`}
              day={day}
              index={index}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
