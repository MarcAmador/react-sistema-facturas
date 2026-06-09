import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "El usuario es obligatorio";
    }
    if (!password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (username === "admin" && password === "admin123") {
      login(username);
      navigate("/dashboard");
    } else {
      setLoginError("Usuario o contraseña incorrectos");
    }
  };

  useEffect(() => {
    const expired = localStorage.getItem("sessionExpired");
    if (expired) {
      localStorage.removeItem("sessionExpired");
      showToast("Tu sesión ha expirado. Inicia sesión nuevamente.", "error");
    }
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg" style={{ width: "450px" }}>
        <div className="card-body p-4">
          <h1 className="text-center mb-4">Dashboard Facturas</h1>
          <h4 className="text-center mb-4">Iniciar Sesión</h4>

          {loginError && (
            <div className="alert alert-danger">
              <i className="bi bi-x-circle-fill me-2"></i>
              {loginError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person-fill"></i>
                </span>
                <input
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="invalid-feedback d-block">{errors.username}</div>
            </div>

            <div className="mb-4">
              <label className="form-label">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="invalid-feedback d-block">{errors.password}</div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;