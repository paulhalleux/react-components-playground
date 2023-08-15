import { CSSProperties } from "react";
import ReactDOM from "react-dom/client";

import { Button, Header, Navigation } from "./components";
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
        <Header layout="3-column">
          <Header.Logo>
            <img src="https://placekitten.com/100/100" alt="Logo" />
          </Header.Logo>
          <Header.Navigation>
            <Navigation.Link href="/">Home</Navigation.Link>
            <Navigation.Link href="/docs">Docs</Navigation.Link>
            <Navigation.Link href="/playground">Playground</Navigation.Link>
          </Header.Navigation>
        </Header>
      </div>
    </div>
  </ThemeProvider>,
);
