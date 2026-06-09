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

const validate = () => {

  const newErrors = {};

  if (!titulo.trim()) {

    newErrors.titulo =
      "El título es obligatorio";

  } else if (titulo.trim().length < 5) {

    newErrors.titulo =
      "Debe tener al menos 5 caracteres";

  }

  if (!descripcion.trim()) {

    newErrors.descripcion =
      "La descripción es obligatoria";

  } else if (
    descripcion.trim().length < 10
  ) {

    newErrors.descripcion =
      "Debe tener al menos 10 caracteres";

  }

  return newErrors;

};

  const handleSubmit = (e) => {

    const validationErrors =
      validate();

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {

      e.preventDefault();

      setErrors(validationErrors);

      return;

    }

    setErrors({});

    onSubmit(e);

};

  return (
    <form onSubmit={handleSubmit}>

      {Object.keys(errors).length > 0 && (

        <div className="alert alert-danger">

          <i className="bi bi-exclamation-triangle-fill me-2"></i>

          Por favor corrige los errores
          antes de continuar.

        </div>

      )}

      <div className="mb-3">
      <div className="mb-3">

        <label className="form-label">
          Cliente
        </label>

        <div className="input-group">

          <span className="input-group-text">
            <i className="bi bi-person-fill"></i>
          </span>

          <input
            type="text"
            className="form-control"
            value={cliente}
            onChange={(e) =>
              onClienteChange(
                e.target.value
              )
            }
            placeholder="Nombre del cliente"
          />

        </div>

      </div>
        <label className="form-label">
          Título
        </label>

        <input
          type="text"
          className={`form-control ${
            errors.titulo
              ? "is-invalid"
              : titulo.length >= 5
              ? "is-valid"
              : ""
          }`}
          value={titulo}
          onChange={(e) =>
            onTituloChange(e.target.value)
          }
        />

        <div className="invalid-feedback">
          {errors.titulo}
        </div>
      </div>

      <div className="mb-3">

        <label className="form-label">
          Descripción
        </label>

        <textarea
          className={`form-control ${
            errors.descripcion
              ? "is-invalid"
              : descripcion.length >= 10
              ? "is-valid"
              : ""
          }`}
          rows="4"
          value={descripcion}
          onChange={(e) =>
            onDescripcionChange(
              e.target.value
            )
          }
        />

    
        <div className="mb-4">

          <label className="form-label">
            Estado
          </label>

          <select
            className="form-select"
            value={estado}
            onChange={(e) =>
              onEstadoChange(
                e.target.value
              )
            }
          >

            <option value="Pendiente">
              Pendiente
            </option>

            <option value="Pagada">
              Pagada
            </option>

            <option value="Vencida">
              Vencida
            </option>

            <option value="Anulada">
              Anulada
            </option>

          </select>

        </div>

        <div className="invalid-feedback">
          {errors.descripcion}
        </div>

      </div>

    <div className="justify-content-center mb-3">
      <button
        type="submit"
        className="btn btn-success px-5"
        disabled={loading}
      >

      {loading ? (

        <>
          <span
            className="spinner-border spinner-border-sm me-2"
          ></span>

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