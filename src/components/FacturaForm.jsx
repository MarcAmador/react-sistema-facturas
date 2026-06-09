import { useState } from "react";

function FacturaForm({
  titulo,
  descripcion,
  estado,
  onTituloChange,
  onDescripcionChange,
  onEstadoChange,
  onSubmit,
  textoBoton,
  loading,
  cliente,
  onClienteChange,
}) {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!cliente.trim()) {
      newErrors.cliente = "El cliente es obligatorio";
    }

    if (!titulo.trim()) {
      newErrors.titulo = "El título es obligatorio";
    } else if (titulo.trim().length < 5) {
      newErrors.titulo = "Debe tener al menos 5 caracteres";
    }

    if (!descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    } else if (descripcion.trim().length < 10) {
      newErrors.descripcion = "Debe tener al menos 10 caracteres";
    }

    return newErrors;
  };

  const validateField = (field, value) => {
    let error = "";

    switch (field) {
      case "cliente":
        if (!value.trim()) {
          error = "El cliente es obligatorio";
        }
        break;
      case "titulo":
        if (!value.trim()) {
          error = "El título es obligatorio";
        } else if (value.trim().length < 5) {
          error = "Debe tener al menos 5 caracteres";
        }
        break;
      case "descripcion":
        if (!value.trim()) {
          error = "La descripción es obligatoria";
        } else if (value.trim().length < 10) {
          error = "Debe tener al menos 10 caracteres";
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  };

  const handleSubmit = (e) => {
    setSubmitted(true);
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      e.preventDefault();
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitted && Object.keys(errors).some((key) => errors[key]) && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Por favor corrige los errores antes de continuar.
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Cliente</label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-person-fill"></i>
          </span>
          <input
            type="text"
            className={`form-control ${
              errors.cliente ? "is-invalid" : cliente.trim() ? "is-valid" : ""
            }`}
            value={cliente}
            onChange={(e) => {
              onClienteChange(e.target.value);
              validateField("cliente", e.target.value);
            }}
            placeholder="Nombre del cliente"
          />
          <div className="invalid-feedback">{errors.cliente}</div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          className={`form-control ${
            errors.titulo ? "is-invalid" : titulo.trim().length >= 5 ? "is-valid" : ""
          }`}
          value={titulo}
          onChange={(e) => {
            onTituloChange(e.target.value);
            validateField("titulo", e.target.value);
          }}
        />
        <div className="invalid-feedback">{errors.titulo}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className={`form-control ${
            errors.descripcion ? "is-invalid" : descripcion.trim().length >= 10 ? "is-valid" : ""
          }`}
          rows="4"
          value={descripcion}
          onChange={(e) => {
            onDescripcionChange(e.target.value);
            validateField("descripcion", e.target.value);
          }}
        />
        <div className="invalid-feedback">{errors.descripcion}</div>
      </div>

      <div className="mb-4">
        <label className="form-label">Estado</label>
        <select
          className="form-select"
          value={estado}
          onChange={(e) => onEstadoChange(e.target.value)}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Pagada">Pagada</option>
          <option value="Vencida">Vencida</option>
          <option value="Anulada">Anulada</option>
        </select>
      </div>

      <div className="d-flex justify-content-center mb-3">
        <button type="submit" className="btn btn-success px-5" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Guardando...
            </>
          ) : (
            textoBoton
          )}
        </button>
      </div>
    </form>
  );
}

export default FacturaForm;