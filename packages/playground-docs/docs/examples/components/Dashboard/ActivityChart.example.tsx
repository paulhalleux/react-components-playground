import { useMemo } from "react";
import {
  ActivityChart,
  ActivityChartVariant,
  Flex,
  Label,
  oneYearBefore,
  StatusIndicator,
} from "@paulhalleux/react-playground";

import {
  ExampleComponentProps,
  ExampleMetadata,
} from "../../../../src/components/Mdx/Example";

type ActivityChartExampleControls = {
  variant: ActivityChartVariant;
  showLegend: boolean;
  showTooltip: boolean;
  showLabels: boolean;
};

function ActivityChartExample({
  controls,
}: ExampleComponentProps<ActivityChartExampleControls>) {
  const activity = useMemo(() => getRandomActivity(), []);
  const today = new Date();
  return (
    <ActivityChart
      items={activity}
      start={oneYearBefore(today)}
      end={today}
      variant={controls.variant}
    >
      {controls.showLegend && <ActivityChart.Legend />}
      {controls.showTooltip && (
        <ActivityChart.Tooltip>
          {({ activity, day }) => (
            <>
              <div>{day.toDateString()}</div>
              <Flex alignItems="center" gap={6}>
                <StatusIndicator status="primary" />
                <Label>{activity.length} activities</Label>
              </Flex>
            </>
          )}
        </ActivityChart.Tooltip>
      )}
      {controls.showLabels && <ActivityChart.Labels type="day" />}
      {controls.showLabels && <ActivityChart.Labels type="month" />}
    </ActivityChart>
  );
}

const getRandomActivity = () => {
  // generate random activity for some days in the past year
  const today = new Date();
  const oneYearAgo = oneYearBefore(today);
  const activityAmount = Math.floor(Math.random() * 1000);
  const activity = [];
  for (let i = 0; i < activityAmount; i++) {
    activity.push({
      id: i.toString(),
      date: new Date(
        oneYearAgo.getTime() +
          Math.random() * (today.getTime() - oneYearAgo.getTime()),
      ),
    });
  }
  return activity;
};

export const metadata: ExampleMetadata = {
  name: "Activity Chart",
  component: ActivityChartExample,
  display: {
    padding: true,
    align: "center",
  },
  controls: [
    {
      type: "select",
      label: "Variant",
      property: "variant",
      options: ["primary", "info", "success", "warning", "danger"],
      value: "primary",
    },
    {
      type: "boolean",
      value: true,
      label: "Show Legend",
      property: "showLegend",
    },
    {
      type: "boolean",
      value: true,
      label: "Show Tooltip",
      property: "showTooltip",
    },
    {
      type: "boolean",
      value: true,
      label: "Show Labels",
      property: "showLabels",
    },
  ],
};
