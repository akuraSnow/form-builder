import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { RegisterFormBuilder } from "./dynamic/builder";
import RenderProvider from './renderProvider/index'
import data from "./UI-element/index";
import extensionFun from "./extension";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

RegisterFormBuilder.use(data).extends(extensionFun).render(RenderProvider);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
