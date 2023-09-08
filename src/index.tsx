import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { RegisterFormBuilder } from "./dynamic/builder";

import validator from "./provider/validator";
import components from "./provider/UI-element";
import extension from "./provider/extension";
import RenderProvider from "./provider/renderProvider";
import converter from "./provider/converter";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


RegisterFormBuilder.use({
  components,
  extension,
  validator,
  converter
}).render(RenderProvider);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
