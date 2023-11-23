/**
 * The main entry point of the Santa App.
 * Renders the SantaForm component wrapped in a Redux Provider.
 *
 * @remarks
 * This file is responsible for rendering the SantaForm component and providing the Redux store.
 *
 * @packageDocumentation
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import SantaForm from "./pages/SantaForm";

/**
 * Renders the Santa App.
 */
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <SantaForm />
    </Provider>
  </React.StrictMode>
);
