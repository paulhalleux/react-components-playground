import { CSSProperties, useState } from "react";
import ReactDOM from "react-dom/client";

import { Button, Transfer } from "./components";
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
  const [value, setValue] = useState<string[]>([]);
  return (
    <Transfer
      items={[
        { id: "1", label: "Item 1" },
        { id: "2", label: "Item 2" },
        { id: "3", label: "Item 3" },
        { id: "4", label: "Item 4" },
        { id: "5", label: "Item 5" },
        { id: "6", label: "Item 6" },
        { id: "7", label: "Item 7" },
        { id: "8", label: "Item 8" },
        { id: "9", label: "Item 9" },
        { id: "10", label: "Item 10" },
      ]}
      selectedItems={value}
      onChange={setValue}
    />
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
