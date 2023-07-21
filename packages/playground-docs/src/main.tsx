import React from "react";
import ReactDOM from "react-dom/client";
import { Application } from "./Application";
import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
);
