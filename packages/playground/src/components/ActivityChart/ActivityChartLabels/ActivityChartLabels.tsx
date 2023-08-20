import { useMemo } from "react";
import clsx from "clsx";

import { getDayName, getMonthName, Week } from "../../../utils/date";
import { Label } from "../../Label";
import { Tooltip } from "../../Tooltip";
import { useActivityChart } from "../activity-chart-context";

import styles from "./ActivityChartLabels.module.scss";

export type ActivityChartLabelsProps = {
  /**
   * The type of the labels.
   */
  type: "day" | "month";
};

const days = [
  { day: 1, gridRow: 2 },
  { day: 3, gridRow: 4 },
  { day: 5, gridRow: 6 },
];

export function ActivityChartLabels({ type }: ActivityChartLabelsProps) {
  const { weeks } = useActivityChart();
  const months = useMemo(() => getMonths(weeks), [weeks]);

  if (type === "day") {
    return (
      <div
        className={clsx(
          styles["activity-chart__labels"],
          styles["activity-chart__labels--day"],
        )}
      >
        {days.map((day) => (
          <Tooltip
            content={getDayName(day.day, "long")}
            key={day.day}
            position="left"
            noPointerEvents
            containerStyle={{
              gridRow: day.gridRow,
            }}
          >
            <Label>{getDayName(day.day)}</Label>
          </Tooltip>
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        styles["activity-chart__labels"],
        styles["activity-chart__labels--month"],
      )}
      style={{
        gridTemplateColumns: getTemplateColumns(months),
      }}
    >
      {months.map((month, index) => (
        <Tooltip
          key={month.month}
          content={getMonthName(month.month, "long")}
          noPointerEvents
          containerStyle={{
            gridColumn: index + 1,
          }}
        >
          <Label className={styles.label}>
            <div>{getMonthName(month.month)}</div>
          </Label>
        </Tooltip>
      ))}
    </div>
  );
}

type Month = {
  month: number;
  span: number;
};

/**
 * Get the template columns for the months.
 * @param months The months.
 * @returns The template columns.
 */
function getTemplateColumns(months: Month[]) {
  return months.map((month) => `${14 * (month.span + 1) - 3}px`).join(" ");
}

/**
 * Get the months and their span from the weeks.
 * @param weeks The weeks.
 * @returns The months.
 */
function getMonths(weeks: Week[]): Month[] {
  const months: Month[] = [];

  weeks.forEach((week) => {
    const prevWeek = weeks[weeks.indexOf(week) - 1];
    if (prevWeek && week.month === prevWeek.month) {
      months[months.length - 1].span++;
    } else {
      months.push({
        month: week.month,
        span: 0,
      });
    }
  });

  return months;
}
