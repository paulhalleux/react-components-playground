import { CSSProperties } from "react";
import ReactDOM from "react-dom/client";

import { ActivityChart } from "./components/ActivityChart";
import { oneYearBefore } from "./utils/date";
import { Button, Flex, Label, StatusIndicator } from "./components";
import { ThemeContext, ThemeProvider } from "./theme";

import "./index.app.scss";

const Container: CSSProperties = {
  width: 1080 / 2,
  height: 1080 / 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
};

const App = () => {
  const today = new Date();
  return (
    <ActivityChart
      items={getRandomActivity()}
      start={oneYearBefore(today)}
      end={today}
      variant="primary"
    >
      <ActivityChart.Legend />
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
      <ActivityChart.Labels type="day" />
      <ActivityChart.Labels type="month" />
    </ActivityChart>
  );
};

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

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ThemeProvider>
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <Button
            onClick={() => setTheme(theme === "Light" ? "Dark" : "Light")}
          >
            Switch theme
          </Button>
        </div>
      )}
    </ThemeContext.Consumer>
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(var(--color-main))",
      }}
    >
      <div style={Container}>
        <App />
      </div>
    </div>
  </ThemeProvider>,
);
