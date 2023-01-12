import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { injectStore } from "./api/baseClient";
import { store } from "./store";
import App from "./App";
import './i18n';
import "./index.css";
import reportWebVitals from './reportWebVitals';

// Inject store here to prevent circular import issue
injectStore(store);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
