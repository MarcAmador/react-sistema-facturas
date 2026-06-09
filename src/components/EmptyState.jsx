function EmptyState({ message = "No hay datos disponibles." }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body text-center py-5">
        <div className="text-muted mb-3">
          <i className="bi bi-inbox fs-1"></i>
        </div>
        <h5 className="fw-bold text-dark mb-1">Sin resultados</h5>
        <p className="text-secondary mb-0 small">
          {message}
        </p>
      </div>
    </div>
  );
}

export default EmptyState;