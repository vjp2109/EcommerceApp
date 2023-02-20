import React from "react";
import ReactDom from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root"),
  root = ReactDom.createRoot(rootElement);

root.render(<App />);
