import { CSSProperties } from "react";
import ReactDOM from "react-dom/client";

import {
  Button,
  CleanIcon,
  ContextMenu,
  InfoIcon,
  PlusIcon,
} from "./components";
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
        <ContextMenu
          id="example"
          reserveIconsSpace
          closeOnSelect
          onSelect={console.log}
        >
          <ContextMenu.Trigger>
            <Button>Open context menu</Button>
          </ContextMenu.Trigger>
          <ContextMenu.Item addon={<CleanIcon height={14} width={14} />}>
            Item 1
          </ContextMenu.Item>
          <ContextMenu.Item id="Item 2">Item 2</ContextMenu.Item>
          <ContextMenu.Item id="Item 3">Item 3</ContextMenu.Item>
          <ContextMenu.Divider />
          <ContextMenu.Sub addon={<PlusIcon />} label="Sub menu">
            <ContextMenu.Item id="Item 1">Item 1</ContextMenu.Item>
            <ContextMenu.Item id="Item 2">Item 2</ContextMenu.Item>
            <ContextMenu.Item id="Item 3">Item 3</ContextMenu.Item>
            <ContextMenu.Sub
              addon={<InfoIcon height={14} width={14} />}
              label="Sub menu"
              variant="danger"
            >
              <ContextMenu.Item id="Item 1">Item 1</ContextMenu.Item>
              <ContextMenu.Item id="Item 2">Item 2</ContextMenu.Item>
              <ContextMenu.Item id="Item 3">Item 3</ContextMenu.Item>
            </ContextMenu.Sub>
          </ContextMenu.Sub>
        </ContextMenu>
      </div>
    </div>
  </ThemeProvider>,
);
