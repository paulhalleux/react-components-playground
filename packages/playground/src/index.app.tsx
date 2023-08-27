import { CSSProperties, useState } from "react";
import ReactDOM from "react-dom/client";

import { Button, StringBuilder, Text } from "./components";
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
  const [value, setValue] = useState(
    `Hello {{first_name}} {{last_name}},\n\nThank you for registering to our platform.\n\nYour account has been created with the following email: {{email}}.\n\nBest regards,\n\nThe team - {{ date }}`,
  );

  return (
    <>
      <StringBuilder
        value={value}
        onChange={setValue}
        variables={[
          { label: "First name", value: "first_name" },
          { label: "Last name", value: "last_name" },
          { label: "Email", value: "email" },
        ]}
      />
      <Text type="text-xs" style={{ marginTop: 16 }}>
        <pre>{value}</pre>
      </Text>
    </>
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
