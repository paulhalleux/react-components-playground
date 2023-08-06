import { CSSProperties } from "react";
import ReactDOM from "react-dom/client";

import { Radio } from "./components/Radio";
import { Button } from "./components";
import { ThemeContext, ThemeProvider, ThemeType } from "./theme";

import "./index.app.scss";

const Container: CSSProperties = {
  width: 1920 / 2,
  height: 1080 / 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <ThemeProvider>
    <ThemeContext.Consumer>
      {({ theme, setTheme }) => (
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <Button
            onClick={() =>
              setTheme(
                theme === ThemeType.Light ? ThemeType.Dark : ThemeType.Light,
              )
            }
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
        <Radio
          size="small"
          id="test"
          name="test"
          label="Checkbox"
          selected="item1"
          value={"item1"}
          onChange={() => {}}
        />
        <Radio
          id="test"
          name="test"
          label="Checkbox"
          selected="item1"
          value={"item2"}
          onChange={() => {}}
        />
      </div>
    </div>
  </ThemeProvider>,
);
