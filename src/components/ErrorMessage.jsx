function ErrorMessage({ message = "Ha ocurrido un error." }) {
  return (
    <div className="card border-danger shadow-sm">
      <div className="card-body d-flex align-items-center gap-3 py-3">
        <div className="text-danger">
          <i className="bi bi-exclamation-triangle-fill fs-3"></i>
        </div>
        <div>
          <h5 className="alert-heading fw-bold text-danger mb-1">Error</h5>
          <p className="mb-0 text-secondary small">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;