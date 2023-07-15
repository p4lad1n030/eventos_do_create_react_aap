import React from "react";
import ReactDOM from "react-dom/client";
import { configStore } from "./store/reducers";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

const store = configStore();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
