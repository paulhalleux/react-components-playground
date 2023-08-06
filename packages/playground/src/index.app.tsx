import { CSSProperties } from "react";
import ReactDOM from "react-dom/client";

import { Anchor } from "./components";
import { ThemeProvider } from "./theme";

import "./index.app.scss";

const Container: CSSProperties = {
  width: 1920 / 2,
  height: 1080 / 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ThemeProvider>
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
        <Anchor target="_blank" to={"https://google.com"}>
          Google
        </Anchor>
      </div>
    </div>
  </ThemeProvider>,
);
