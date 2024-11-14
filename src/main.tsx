import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import "@/assets/styles/global.scss";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import { mockXHR } from "@/mock";
import "@/utils/global";
mockXHR();

// 状态管理
import { Provider } from "react-redux";
import store from "@/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);
