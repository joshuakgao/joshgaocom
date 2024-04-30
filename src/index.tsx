import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";
import App from "./App";
import { ScrollToTop } from "./components/customComponents";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToTop />
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </HashRouter>
  </React.StrictMode>
);
