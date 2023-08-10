import { CSSProperties } from "react";
import ReactDOM from "react-dom/client";

import { EditInline } from "./components/EditInline";
import { Button, Tabs } from "./components";
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
        <EditInline value="He" onChange={() => {}} />
        <Tabs tabsRename>
          <Tabs.Tab id="tab1" label="Tab 1">
            Tab 1 content here ... Lorem ipsum dolor sit amet consectetur
          </Tabs.Tab>
          <Tabs.Tab id="tab2" label="Tab 2">
            Tab 1 content here ... Lorem ipsum dolor sit amet consectetur
          </Tabs.Tab>
        </Tabs>
      </div>
    </div>
  </ThemeProvider>,
);
