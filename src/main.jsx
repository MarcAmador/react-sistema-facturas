//Archivo principal, renderizado de la app
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//BrowserRouter para manejar las rutas de la app
//import { BrowserRouter } from "react-router-dom";

//Proveedor del contexto de autenticación
import { AuthProvider } from "./context/AuthContext.jsx";
import {ToastProvider} from "./context/ToastContext";
import { FacturaProvider } from "./context/FacturaContext.jsx";
import { HashRouter } from 'react-router-dom';

//Importar el componente principal de la app
import App from "./App.jsx";

//Importar estilos de bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// ... tus otras importaciones
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// ¡AÑADE ESTA LÍNEA PARA QUE EL MENÚ PUEDA ABRIRSE!
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "./index.css";
// ... resto de tu código
import "./index.css";

//Renderizado de la app, envuelta en BrowserRouter para manejar las rutas
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