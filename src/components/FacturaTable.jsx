import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";

function FacturaTable({ facturas, onDelete, onSort, sortField, sortDirection }) {
  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <i className="bi bi-arrow-down-up text-primary ms-1"></i>;
    }
    return sortDirection === "asc" ? (
      <i className="bi bi-caret-up-fill text-primary ms-1"></i>
    ) : (
      <i className="bi bi-caret-down-fill text-primary ms-1"></i>
    );
  };

  const getBadgeClass = (estado) => {
    switch (estado) {
      case "Pagada":
        return "bg-success";
      case "Pendiente":
        return "bg-warning text-dark";
      case "Vencida":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  return (
    <table className="table table-striped table-hover table-sm text-nowrap">
      <thead>
        <tr>
          <th style={{ cursor: "pointer" }} onClick={() => onSort("id")}>
            ID {renderSortIcon("id")}
          </th>
          <th style={{ cursor: "pointer" }} onClick={() => onSort("cliente")}>
            Cliente {renderSortIcon("cliente")}
          </th>
          <th style={{ cursor: "pointer" }} onClick={() => onSort("estado")}>
            Estado {renderSortIcon("estado")}
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
                <span className={`badge ${getBadgeClass(factura.estado)}`}>
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
            <td colSpan="4" className="p-0 border-0">
              <EmptyState message="No se encontraron facturas con ese criterio." />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default FacturaTable;