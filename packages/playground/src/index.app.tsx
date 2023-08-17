import { CSSProperties, useState } from "react";
import ReactDOM from "react-dom/client";

import { Button, Select } from "./components";
import { ThemeContext, ThemeProvider, ThemeType } from "./theme";

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
  const [value, setValue] = useState<string | undefined>("option-1");
  return (
    <div>
      <Select
        value={value}
        onChange={setValue}
        options={[
          { label: "Option 1", value: "option-1" },
          { label: "Option 2", value: "option-2" },
          { label: "Option 3", value: "option-3" },
          { label: "Option 4", value: "option-4" },
          { label: "Option 5", value: "option-5" },
          { label: "Option 6", value: "option-6" },
          { label: "Option 7", value: "option-7" },
          { label: "Option 8", value: "option-8" },
        ]}
      />
    </div>
  );
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
        <App />
      </div>
    </div>
  </ThemeProvider>,
);
