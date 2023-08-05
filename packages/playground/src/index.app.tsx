import ReactDOM from "react-dom/client";

import { CleanIcon, EmptyState } from "./components";
import { ThemeProvider } from "./theme";

import "./index.app.scss";

const Options = {
  width: 1920 / 2,
  height: 1080 / 2,
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
      <div style={Options}>
        <EmptyState
          title="Component not found"
          description="404"
          actions={[{ type: "button", onClick: () => {}, label: "Go back" }]}
          icon={CleanIcon}
        />
      </div>
    </div>
  </ThemeProvider>,
);
