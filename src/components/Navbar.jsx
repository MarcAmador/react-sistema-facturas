import { Link } from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  const handleSessionExpired = () => {

    localStorage.setItem(
      "sessionExpired",
      "true"
    );

    logout();

    navigate("/login");

  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          App de Facturas
        </Link>

        <div className="navbar-nav">

          {/* <Link className="nav-link" to="/login">
            Login
          </Link> */}

          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>

          <Link className="nav-link" to="/facturas">
            Facturas
          </Link>

          <Link className="nav-link" to="/nueva-factura">
            Nueva Factura
          </Link>

          <button
            className="btn btn-warning btn-sm ms-3"
            onClick={handleSessionExpired}
          >
            Simular 401
          </button>

            {
            user && (
                <button className="btn btn-danger btn-sm ms-3" onClick={handleLogout}>
                  Salir
                </button>
                )
            }

        </div>

      </div>
    </nav>
  );
}

export default Navbar;