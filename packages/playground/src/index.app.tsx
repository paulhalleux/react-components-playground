import { CSSProperties } from "react";
import ReactDOM from "react-dom/client";

import { Badge, BadgeSize, Button, Flex } from "./components";
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

const Size = ({ size }: { size: BadgeSize }) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    gap={10}
    style={{
      width: 200,
    }}
  >
    <Badge size={size}>Default</Badge>
    <Badge size={size} state="secondary">
      Secondary
    </Badge>
    <Badge size={size} state="info">
      Info
    </Badge>
    <Badge size={size} state="primary">
      Primary
    </Badge>
    <Badge size={size} state="success">
      Success
    </Badge>
    <Badge size={size} state="warning">
      Warning
    </Badge>
    <Badge size={size} state="danger">
      Danger
    </Badge>
    <Badge size={size} shape="pill">
      Pill
    </Badge>
    <Badge size={size} shape="pill" state="secondary">
      Secondary
    </Badge>
    <Badge size={size} shape="pill" state="info">
      Info
    </Badge>
    <Badge size={size} shape="pill" state="primary">
      Primary
    </Badge>
    <Badge size={size} shape="pill" state="success">
      Success
    </Badge>
    <Badge size={size} shape="pill" state="warning">
      Warning
    </Badge>
    <Badge size={size} shape="pill" state="danger">
      Danger
    </Badge>
  </Flex>
);

const App = () => {
  return (
    <Flex flexDirection="row" gap={10} justifyContent="center">
      <Size size="small" />
      <Size size="large" />
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
