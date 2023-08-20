import React, { useMemo } from "react";

import { Slot } from "../../Slot/Slot";
import { useSlotExists } from "../../Slot/slot-context";
import { Tooltip } from "../../Tooltip";
import { useActivityChart } from "../activity-chart-context";
import { ActivityIndicator } from "../ActivityIndicator";
import { ActivityIndicatorIntensity } from "../ActivityIndicator/ActivityIndicator";

import { ActivityChartTooltip } from "./ActivityChartTooltip";

export type ActivityChartDayProps = {
  day: Date | undefined;
  index: number;
};

export function ActivityChartDay({ day, index }: ActivityChartDayProps) {
  const exists = useSlotExists(ActivityChartTooltip);
  const { items, computeIntensity, variant } = useActivityChart();
  const { activity } = useMemo(() => {
    const activity = items.filter(
      (item) => item.date.toDateString() === day?.toDateString(),
    );

    return {
      activity,
    };
  }, [items, day]);

  if (!day) return null;

  const DayContent = (
    <ActivityIndicator
      active={activity.length > 0}
      intensity={computeIntensity(activity) as ActivityIndicatorIntensity}
      variant={variant}
    />
  );

  if (!exists) return DayContent;

  return (
    <Tooltip
      variant="secondary"
      noPointerEvents
      content={
        <Slot
          elementType={ActivityChartTooltip}
          props={{
            activity,
            day,
          }}
        />
      }
      delay={50}
      containerStyle={{
        gridRow: index + 1,
      }}
    >
      {DayContent}
    </Tooltip>
  );
}
