function InvoicePreview({ factura }) {
  return (
    <div className="invoice-paper mt-4">
      <div className="invoice-header d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-0">FACTURA</h2>
          <small>Sistema de Facturación</small>
        </div>
        <div>
          <h4>#{factura.id}</h4>
        </div>
      </div>

      <div className="invoice-body card-body">
        <div className="row mb-4">
          <div className="col-md-6">
            <p className="mb-1"><strong>Cliente:</strong></p>
            <p><i className="bi bi-person-fill me-2"></i>{factura.cliente}</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-1"><strong>Fecha:</strong></p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-4">
          <span
            className={`badge px-3 py-2 ${
              factura.estado === "Pagada"
                ? "bg-success"
                : factura.estado === "Pendiente"
                ? "bg-warning text-dark"
                : factura.estado === "Vencida"
                ? "bg-danger"
                : "bg-secondary"
            }`}
          >
            {factura.estado}
          </span>
        </div>

        <hr />

        <h6>Título</h6>
        <p className="fs-5">{factura.titulo || "Sin título"}</p>

        <h6>Descripción</h6>
        <div className="border rounded p-3 bg-light">
          {factura.descripcion || "Sin descripción"}
        </div>
      </div>

      <div className="invoice-footer card-footer text-center text-muted">
        Gracias por su preferencia
      </div>
      <div className="invoice-cut"></div>
    </div>
  );
}

export default InvoicePreview;