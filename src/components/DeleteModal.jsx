function DeleteModal({
  show,
  onClose,
  onConfirm,
}) {

  if (!show) return null;

  return (

    <div
      className="modal d-block"
      tabIndex="-1"
    >

      <div className="modal-dialog">

        <div className="modal-content">

          <div className="modal-header">

            <h5 className="modal-title">
              Confirmar eliminación
            </h5>

          </div>

          <div className="modal-body">

            <p>
              ¿Desea eliminar esta factura?
            </p>

          </div>

          <div className="modal-footer">

            <button
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Eliminar
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default DeleteModal;