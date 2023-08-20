import React, { PropsWithChildren } from "react";

import { Slot } from "../Slot/Slot";
import { SlotProvider } from "../Slot/slot-context";

import { ActivityChartTooltip } from "./ActivityChartActivity/ActivityChartTooltip";
import { ActivityChartProvider } from "./activity-chart-context";
import { ActivityChartActivity } from "./ActivityChartActivity";
import { ActivityChartLabels } from "./ActivityChartLabels";
import { ActivityChartLegend } from "./ActivityChartLegend";

import styles from "./ActivityChart.module.scss";

export type ActivityChartItemType = {
  id: string;
  date: Date;
};

export type ActivityChartVariant =
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type ActivityChartProps = PropsWithChildren<{
  /**
   * The activity items.
   */
  items: ActivityChartItemType[];
  /**
   * The start date.
   */
  start: Date;
  /**
   * The end date.
   */
  end: Date;
  /**
   * The variant.
   */
  variant?: ActivityChartVariant;
  /**
   * Compute the intensity of the activity.
   * @param activity
   */
  computeIntensity?: (activity: ActivityChartItemType[]) => number;
}>;

export function ActivityChart({
  start,
  end,
  items,
  variant = "primary",
  children,
  computeIntensity = getIntensity,
}: ActivityChartProps) {
  return (
    <ActivityChartProvider
      items={items}
      start={start}
      end={end}
      variant={variant}
      computeIntensity={computeIntensity}
    >
      <SlotProvider element={children}>
        <div className={styles["activity-chart__container"]}>
          <Slot
            elementType={ActivityChartLabels}
            condition={(element) => element.props.type === "day"}
          >
            {(element) => (
              <div style={{ gridArea: "labels-day" }}>{element}</div>
            )}
          </Slot>
          <Slot
            elementType={ActivityChartLabels}
            condition={(element) => element.props.type === "month"}
          >
            {(element) => (
              <div style={{ gridArea: "labels-month" }}>{element}</div>
            )}
          </Slot>
          <ActivityChartActivity />
          <Slot elementType={ActivityChartLegend}>
            {(element) => <div style={{ gridArea: "legend" }}>{element}</div>}
          </Slot>
        </div>
      </SlotProvider>
    </ActivityChartProvider>
  );
}

ActivityChart.Legend = ActivityChartLegend;
ActivityChart.Tooltip = ActivityChartTooltip;
ActivityChart.Labels = ActivityChartLabels;

/**
 * Get the intensity of the activity.
 * @param activity The activity.
 * @returns The intensity.
 */
function getIntensity(activity: ActivityChartItemType[]) {
  return Math.min(activity.length, 5) * 2;
}
