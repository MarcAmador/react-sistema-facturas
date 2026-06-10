import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Facturas from "./pages/Facturas";
import EditarFactura from "./pages/EditarFactura";
import DetalleFactura from "./pages/FacturaDetalle";
import NuevaFactura from "./pages/NuevaFactura";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/facturas" element={<PrivateRoute><Facturas /></PrivateRoute>} />
        <Route path="/facturas/nueva" element={<PrivateRoute><NuevaFactura /></PrivateRoute>} />
        <Route path="/facturas/:id" element={<PrivateRoute><DetalleFactura /></PrivateRoute>} />
        <Route path="/facturas/editar/:id" element={<PrivateRoute><EditarFactura /></PrivateRoute>} />
      </Routes>
    </MainLayout>
  );
}

export default App;