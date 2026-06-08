function EmptyState({
  message = "No hay datos disponibles."
}) {

  return (

    <div className="card">

      <div className="card-body text-center py-5">

        <h4>
          📭 Sin resultados
        </h4>

        <p className="text-muted mb-0">
          {message}
        </p>

      </div>

    </div>

  );
}

export default EmptyState;