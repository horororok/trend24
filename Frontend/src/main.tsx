import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import { BrowserRouter as Router } from "react-router-dom";

// 메인 앱을 렌더링하는 상태
const appRoot = ReactDOM.createRoot(document.getElementById("root")!);

// 메인 앱을 렌더링
appRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);