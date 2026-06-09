function DeleteModal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow">
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-dark">Confirmar eliminación</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body py-4">
            <p className="mb-0 text-secondary fs-5">
              ¿Está seguro de que desea eliminar esta factura? Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="modal-footer bg-light border-0">
            <button className="btn btn-outline-secondary px-4" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn btn-danger px-4" onClick={onConfirm}>
              <i className="bi bi-trash3-fill me-2"></i>Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;