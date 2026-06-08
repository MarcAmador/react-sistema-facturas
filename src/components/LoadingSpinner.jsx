function LoadingSpinner({
  message = "Cargando información..."
}) {

  return (

    <div className="card shadow-sm">

      <div className="card-body text-center py-5">

        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p className="mt-3 text-muted mb-0">
          {message}
        </p>

      </div>

    </div>

  );
}

export default LoadingSpinner;