import { CSSProperties } from "react";
import ReactDOM from "react-dom/client";

import { Button, Flex, PlayIcon } from "./components";
import { ThemeContext, ThemeProvider } from "./theme";

import "./index.app.scss";

const Container: CSSProperties = {
  width: "100%",
  height: 1080 / 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
};

const App = () => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={16}>
      <Button.Group>
        <Button.Icon icon={PlayIcon} />
        <Button.Icon icon={PlayIcon} />
        <Button.Icon icon={PlayIcon} />
      </Button.Group>
      <Button.Group orientation="vertical">
        <Button.Icon icon={PlayIcon} />
        <Button.Icon icon={PlayIcon} />
        <Button.Icon icon={PlayIcon} />
      </Button.Group>
    </Flex>
  );
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
