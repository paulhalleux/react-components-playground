import { CSSProperties } from "react";
import ReactDOM from "react-dom/client";

import { Button, ResizePanel } from "./components";
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

const Panel: CSSProperties = {
  background: "rgba(255, 0, 0, 0.1)",
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
        <ResizePanel.Group id="G1">
          <ResizePanel.Panel id="P1" style={Panel}>
            Panel 1
          </ResizePanel.Panel>
          <ResizePanel.Panel id="P2" style={Panel}>
            <ResizePanel.Group id="G2" direction="vertical">
              <ResizePanel.Panel id="P2.1" style={Panel}>
                Panel 2.1
              </ResizePanel.Panel>
              <ResizePanel.Panel id="P2.2" style={Panel}>
                <ResizePanel.Group id="G3">
                  <ResizePanel.Panel id="P2.2.1" style={Panel}>
                    Panel 2.2.1
                  </ResizePanel.Panel>
                  <ResizePanel.Panel id="P2.2.2" style={Panel}>
                    Panel 2.2.2
                  </ResizePanel.Panel>
                </ResizePanel.Group>
              </ResizePanel.Panel>
            </ResizePanel.Group>
          </ResizePanel.Panel>
        </ResizePanel.Group>
      </div>
    </div>
  </ThemeProvider>,
);
