//Importamos el navbar para que se muestre en todas las páginas, y el children para mostrar el contenido de cada página
import Navbar from "../components/Navbar";

import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

//Diseño principal, se muestra en todas las páginas
function MainLayout({ children }) {

  const location = useLocation();

  const { user } = useAuth();

  const mostrarNavbar =
    user &&
    location.pathname !== "/" &&
    location.pathname !== "/login";

  return (
    <>
      {mostrarNavbar && <Navbar />}

      <div className="container mt-4">
        {children}
      </div>
    </>
  );
}

export default MainLayout;