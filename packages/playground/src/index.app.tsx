import { CSSProperties } from "react";
import ReactDOM from "react-dom/client";

import { Button, Flex, Text } from "./components";
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
    <Flex flexDirection="column" gap={10} alignItems="center">
      <Text type="h1">Hello world</Text>
      <Text type="h2">Hello world</Text>
      <Text type="h3">Hello world</Text>
      <Text type="h4">Hello world</Text>
      <Text type="h5">Hello world</Text>
      <Text type="h6">Hello world</Text>
      <Text type="text-xs">Hello world</Text>
      <Text type="text-sm">Hello world</Text>
      <Text type="text-md">Hello world</Text>
      <Text type="text-lg">Hello world</Text>
      <Text type="text-xl">Hello world</Text>
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
