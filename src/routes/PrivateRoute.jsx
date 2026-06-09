//Importar Navigate para redirigir a los usuarios no autenticados
import { Navigate } from "react-router-dom";
//Importar el hook personalizado para usar el contexto de autenticación
import { useAuth } from "../hooks/useAuth";

//Componente de ruta privada que envuelve a los componentes que requieren autenticación
function PrivateRoute({ children }) {

    //Obtener la información del usuario desde el contexto de autenticación
  const { user } = useAuth();

  //Si no hay usuario autenticado, redirigir a la página de login
  if (!user) {
    return <Navigate to="/login" replace/>;
  }
//Si hay usuario logueado, renderizar los componentes
  return children;
}

export default PrivateRoute;