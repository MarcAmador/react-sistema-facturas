import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext";
import { FacturaProvider } from "./context/FacturaContext.jsx";
import App from "./App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ToastProvider>
        <AuthProvider>
          <FacturaProvider>
            <App />
          </FacturaProvider>
        </AuthProvider>
      </ToastProvider>
    </HashRouter>
  </StrictMode>
);