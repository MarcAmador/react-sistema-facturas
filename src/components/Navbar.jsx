import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSessionExpired = () => {
    localStorage.setItem("sessionExpired", "true");
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          App de Facturas
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="offcanvas-lg offcanvas-end text-bg-dark" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          <div className="offcanvas-header border-bottom border-secondary">
            <h5 className="offcanvas-title" id="sidebarMenuLabel">Menú de Navegación</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
          </div>

          {/* Se remueven las clases flex generales de este contenedor para móviles */}
          <div className="offcanvas-body d-lg-flex justify-content-lg-between align-items-lg-center">
            
            <ul className="navbar-nav d-flex flex-column flex-lg-row gap-2 gap-lg-0 mb-2 mb-lg-0">
              <li className="nav-item">
                <button 
                  className="nav-link text-start bg-transparent border-0 w-100 d-flex align-items-center" 
                  onClick={() => navigate("/dashboard")} 
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#sidebarMenu"
                >
                  <span className="d-lg-none"><i className="bi bi-house-door-fill me-3"></i></span>Dashboard
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link text-start bg-transparent border-0 w-100 d-flex align-items-center" 
                  onClick={() => navigate("/facturas")} 
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#sidebarMenu"
                >
                  <span className="d-lg-none"><i className="bi bi-file-earmark-text-fill me-3"></i></span>Facturas
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link text-start bg-transparent border-0 w-100 d-flex align-items-center" 
                  onClick={() => navigate("/facturas/nueva")} 
                  data-bs-dismiss="offcanvas"
                  data-bs-target="#sidebarMenu"
                >
                  <span className="d-lg-none"><i className="bi bi-plus-circle-fill me-3"></i></span>Nueva Factura
                </button>
              </li>
            </ul>

            <hr className="d-lg-none my-3 text-secondary" />

            {/* Bloque de botones en flujo natural para pegarse arriba en móviles */}
            <div className="d-flex flex-column flex-lg-row gap-2 align-items-lg-center">
              <button 
                className="btn btn-warning w-100 w-lg-auto text-nowrap py-2 py-lg-1" 
                onClick={handleSessionExpired} 
                data-bs-dismiss="offcanvas" 
                data-bs-target="#sidebarMenu"
              >
                Simular 401
              </button>
              <button 
                className="btn btn-outline-danger w-100 w-lg-auto text-nowrap py-2 py-lg-1" 
                onClick={handleLogout} 
                data-bs-dismiss="offcanvas" 
                data-bs-target="#sidebarMenu"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;