import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/scss/all.scss";
import "bootstrap-icons/font/bootstrap-icons.css";// 
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./router";
import store from "./redux/store.js";
import 'bootstrap'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
