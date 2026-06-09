import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";

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