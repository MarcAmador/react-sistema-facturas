function ErrorMessage({
  message = "Ha ocurrido un error."
}) {

  return (

    <div className="card border-danger">

      <div className="card-body">

        <h4 className="text-danger">
          ⚠ Error
        </h4>

        <p className="mb-0">
          {message}
        </p>

      </div>

    </div>

  );
}

export default ErrorMessage;