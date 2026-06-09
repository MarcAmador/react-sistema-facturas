import { Link } from "react-router-dom";

function FacturaTable({ facturas, onDelete,onSort, sortField, sortDirection }) {

  const renderSortIcon = (field) => {

    if (sortField !== field) {

      return (
        <i
          className="bi bi-arrow-down-up text-primary ms-1"
        ></i>
      );

    }

    return sortDirection === "asc" ? (

      <i
        className="bi bi-caret-up-fill text-primary ms-1"
      ></i>

    ) : (

      <i
        className="bi bi-caret-down-fill text-primary ms-1"
      ></i>

    );

  };

  return (
    <table className="table table-striped table-hover table-sm text-nowrap">

      <thead>

        <tr>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("id")}
          >
            ID
            {renderSortIcon("id")}
          </th>

          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("cliente")}
          >
            Cliente
            {renderSortIcon("cliente")}
          </th>

          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("estado")}
          >
            Estado
            {renderSortIcon("estado")}
          </th>

          <th>Acciones</th>
        </tr>

      </thead>

      <tbody>

        {facturas.length > 0 ? (

          facturas.map((factura) => (

            <tr key={factura.id}>

              <td>{factura.id}</td>

              <td>{factura.cliente}</td>

              <td>

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

              </td>

              <td className="text-nowrap">
                <div className="d-flex gap-1">
                  <Link to={`/facturas/${factura.id}`} className="btn btn-primary btn-sm">
                    <i className="bi bi-eye-fill"></i>
                  </Link>
                  <Link to={`/facturas/editar/${factura.id}`} className="btn btn-warning btn-sm">
                    <i className="bi bi-pencil-fill"></i>
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(factura)}>
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </td>

            </tr>

          ))

        ) : (

          <tr>

          <td
            colSpan="4"
            className="text-center py-5"
          >

            <div className="text-muted">

              <div style={{ fontSize: "3rem" }}>
                📭
              </div>

              <h5 className="mt-3">
                Sin resultados
              </h5>

              <p>
                No se encontraron facturas con ese criterio.
              </p>

            </div>

          </td>

          </tr>

        )}

      </tbody>

    </table>
  );
}

export default FacturaTable;