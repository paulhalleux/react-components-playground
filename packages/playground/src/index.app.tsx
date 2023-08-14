import { CSSProperties } from "react";
import ReactDOM from "react-dom/client";

import { CardGroup } from "./components/Card/CardGroup";
import { Button, Card, CleanIcon } from "./components";
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
        <CardGroup>
          <Card
            orientation="vertical"
            variant="default"
            style={{ minHeight: 150, width: 300 }}
          >
            <Card.Thumbnail maxHeight={150}>
              <img src="https://picsum.photos/800/800" alt="thumbnail" />
            </Card.Thumbnail>
            <Card.Header border>Header</Card.Header>
            <Card.Body>Hello world</Card.Body>
            <Card.Footer border>
              <Button size="small">Click me</Button>
              <Button.Icon size="small" icon={CleanIcon} />
            </Card.Footer>
          </Card>
          <Card
            orientation="vertical"
            variant="default"
            style={{ minHeight: 150, width: 300 }}
          >
            <Card.Thumbnail maxHeight={150}>
              <img src="https://picsum.photos/800/800" alt="thumbnail" />
            </Card.Thumbnail>
            <Card.Header border>Header</Card.Header>
            <Card.Body>Hello world</Card.Body>
            <Card.Footer border>
              <Button size="small">Click me</Button>
              <Button.Icon size="small" icon={CleanIcon} />
            </Card.Footer>
          </Card>
        </CardGroup>
      </div>
    </div>
  </ThemeProvider>,
);
