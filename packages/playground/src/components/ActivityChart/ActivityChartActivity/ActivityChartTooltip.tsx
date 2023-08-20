import { createParameterizedSlotItem } from "../../Slot/create-parameterized-slot-item";
import { ActivityChartItemType } from "../ActivityChart";

export type ActivityChartTooltipData = {
  activity: ActivityChartItemType[];
  day: Date;
};

export const ActivityChartTooltip =
  createParameterizedSlotItem<ActivityChartTooltipData>();
