import React from "react";
import ReactDOM from "react-dom/client";
import { ToasterProvider } from "@paulhalleux/react-playground";

import { ThemeProvider } from "./contexts/theme-context";
import { Application } from "./Application";

import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToasterProvider>
        <Application />
      </ToasterProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
