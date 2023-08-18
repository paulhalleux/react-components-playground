import { CSSProperties } from "react";
import ReactDOM from "react-dom/client";

import { Badge, Button, Card, FileIcon, FolderIcon, Tree } from "./components";
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
  return (
    <Card style={{ padding: 8 }} variant="secondary">
      <Tree size="large">
        <Tree.Node
          id="1"
          label="Node 1"
          addonVisibility="always"
          icon={<FileIcon size={12} />}
          addon={<Badge size="small">2</Badge>}
        />
        <Tree.Node
          id="2"
          label="Node 2"
          icon={<FolderIcon size={12} />}
          addonVisibility="always"
          addon={<Badge size="small">352</Badge>}
        >
          <Tree.Node icon={<FileIcon size={12} />} id="2.1" label="Node 2.1" />
          <Tree.Node icon={<FolderIcon size={12} />} id="2.2" label="Node 2.2">
            <Tree.Node
              icon={<FileIcon size={12} />}
              id="2.2.1"
              label="Node 2.2.1"
            />
            <Tree.Node
              icon={<FileIcon size={12} />}
              id="2.2.2"
              label="Node 2.2.2"
            />
          </Tree.Node>
          <Tree.Node icon={<FileIcon size={12} />} id="2.3" label="Node 2.3" />
        </Tree.Node>
        <Tree.Node
          id="3"
          icon={<FileIcon size={12} />}
          label="Node 3"
          addonVisibility="always"
          addon={<Badge size="small">12</Badge>}
        />
      </Tree>
    </Card>
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
