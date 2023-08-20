import { createContext, PropsWithChildren, useContext, useMemo } from "react";

import { getWeeksBetween, Week } from "../../utils/date";

import { ActivityChartItemType, ActivityChartVariant } from "./ActivityChart";

export type ActivityChartContextType = {
  variant: ActivityChartVariant;
  items: ActivityChartItemType[];
  weeks: Week[];
  start: Date;
  end: Date;
  computeIntensity: (activity: ActivityChartItemType[]) => number;
};

const defaultValue: ActivityChartContextType = {
  items: [],
  weeks: [],
  start: new Date(),
  end: new Date(),
  variant: "primary",
  computeIntensity: () => 0,
};

export const ActivityChartContext = createContext(defaultValue);

export type ActivityChartProviderProps = PropsWithChildren<{
  items: ActivityChartItemType[];
  start: Date;
  end: Date;
  variant: ActivityChartVariant;
  computeIntensity?: (activity: ActivityChartItemType[]) => number;
}>;

export function ActivityChartProvider({
  items,
  start,
  end,
  children,
  variant,
  computeIntensity = () => 0,
}: ActivityChartProviderProps) {
  const weeks = useMemo(() => getWeeksBetween(start, end), [start, end]);
  return (
    <ActivityChartContext.Provider
      value={{ items, weeks, start, end, variant, computeIntensity }}
    >
      {children}
    </ActivityChartContext.Provider>
  );
}

export function useActivityChart() {
  return useContext(ActivityChartContext);
}
