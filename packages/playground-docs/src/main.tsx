import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, ToasterProvider } from "@paulhalleux/react-playground";

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
