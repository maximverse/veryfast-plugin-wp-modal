import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
//contexts
import AppContextFC from "./context/AppContext";
import FormContextFC from "./context/FormContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppContextFC>
      <FormContextFC>
        <App />
      </FormContextFC>
    </AppContextFC>
  </StrictMode>
);
