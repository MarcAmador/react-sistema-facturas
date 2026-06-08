//Archivo principal, renderizado de la app
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//BrowserRouter para manejar las rutas de la app
import { BrowserRouter } from "react-router-dom";

//Proveedor del contexto de autenticación
import { AuthProvider } from "./context/AuthContext.jsx";
import {ToastProvider} from "./context/ToastContext";

//Importar el componente principal de la app
import App from "./App.jsx";

//Importar estilos de bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

//Renderizado de la app, envuelta en BrowserRouter para manejar las rutas
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*Añadimos el basename aquí para la configuración de GitHub Pages*/}
    <BrowserRouter basename={import.meta.env.BASE_URL}> 
      <ToastProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>
);