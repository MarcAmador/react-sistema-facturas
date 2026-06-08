//React-router-dom para navegar entre diferentes páginas
import { Routes, Route } from "react-router-dom";

//Importar el diseño principal desde la carpeta layouts
import MainLayout from "./layouts/MainLayout";

//Importar el componente de ruta privada para proteger las rutas que requieren autenticación
import PrivateRoute from "./routes/PrivateRoute";

//Importar cada componente creado en la carpeta pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Facturas from "./pages/Facturas";
import EditarFactura from "./pages/EditarFactura";
import DetalleFactura from "./pages/FacturaDetalle";
import NuevaFactura from "./pages/NuevaFactura";

//App principal
function App() {
  return (

    //Diseño principal (navbar, main, footer, etc)
    <MainLayout>

    {/* Si el usuario escribe algún path, se redirige al element correspondiente */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* Ruta protegida dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
        path="/facturas"
        element={
          <PrivateRoute>
            <Facturas />
          </PrivateRoute>
        }
        />

        <Route
        path="/facturas/editar/:id"
        element={
          <PrivateRoute>
            <EditarFactura />
          </PrivateRoute>
        }
        />

        <Route
          path="/facturas/:id"
          element={
            <PrivateRoute>
              <DetalleFactura />
            </PrivateRoute>
          }
        />
        <Route
        path="/nueva-factura"
        element={
          <PrivateRoute>
            <NuevaFactura />
          </PrivateRoute>
        }
        />
      </Routes>

    </MainLayout>
  );
}

export default App;