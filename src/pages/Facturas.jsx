import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import Pagination from "../components/Pagination";
import DeleteModal from "../components/DeleteModal";
import Breadcrumb from "../components/Breadcrumb";

import { useFacturas } from "../hooks/useFacturas";

import FacturaTable from "../components/FacturaTable";
import { useToast } from "../context/ToastContext";
import SearchBar from "../components/SearchBar";

function Facturas() {

  const { facturas, loading, error, eliminarFactura} = useFacturas();

  const [showModal, setShowModal] = useState(false);
  const { showToast } = useToast();

  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (loading) {
    return (
      <LoadingSpinner
        message="Cargando facturas..."
      />
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
      />
    );
  }

  const facturasFiltradas =
    facturas.filter((factura) => {

      const coincideBusqueda =

        factura.cliente
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

        ||

        factura.id
          .toString()
          .includes(searchTerm);

      const coincideEstado =
        estadoFiltro === "Todos"
          ? true
          : factura.estado ===
            estadoFiltro;

      return (
        coincideBusqueda &&
        coincideEstado
      );

    });

  const facturasOrdenadas =
    [...facturasFiltradas].sort(
      (a, b) => {

        let valueA =
          a[sortField];

        let valueB =
          b[sortField];

        if (
          typeof valueA === "string"
        ) {

          valueA =
            valueA.toLowerCase();

          valueB =
            valueB.toLowerCase();

        }

        if (valueA < valueB) {

          return sortDirection === "asc"
            ? -1
            : 1;

        }

        if (valueA > valueB) {

          return sortDirection === "asc"
            ? 1
            : -1;

        }

        return 0;

      }
    );

  const totalPages = Math.ceil(
    facturasFiltradas.length /
    itemsPerPage
    );

    const handleDeleteClick = (factura) => {

    setFacturaSeleccionada(factura);

    setShowModal(true);

  };

  const handleDelete = async () => {

    await eliminarFactura(
      facturaSeleccionada.id
    );

    showToast(
      "Factura eliminada",
      "success"
    );

    setShowModal(false);

  };

  const handleSort = (field) => {

    if (sortField === field) {

      setSortDirection(
        sortDirection === "asc"
          ? "desc"
          : "asc"
      );

    } else {

      setSortField(field);

      setSortDirection("asc");

    }

  };

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const endIndex =
    startIndex + itemsPerPage;

  const currentFacturas =
    facturasOrdenadas.slice(
      startIndex,
      endIndex
    );
  
  return (
    <div className="card">

      <div className="card-body">

        <h1>Listado de Facturas</h1>
        <Breadcrumb
          items={[
            {
              label: "Inicio",
              path: "/dashboard",
            },
            {
              label: "Facturas",
            },
          ]}
        />

        <div className="d-flex flex-column flex-md-row gap-2 gap-md-3 mb-3 align-items-start align-items-md-center">
          <strong>Filtrar por:</strong>

          <div className="form-check">
            <input className="form-check-input" type="radio" checked={estadoFiltro === "Todos"} onChange={() => setEstadoFiltro("Todos")} />
            <label className="form-check-label">Todos</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="radio" checked={estadoFiltro === "Pendiente"} onChange={() => setEstadoFiltro("Pendiente")} />
            <label className="form-check-label">Pendientes</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="radio" checked={estadoFiltro === "Pagada"} onChange={() => setEstadoFiltro("Pagada")} />
            <label className="form-check-label">Pagadas</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="radio" checked={estadoFiltro === "Vencida"} onChange={() => setEstadoFiltro("Vencida")} />
            <label className="form-check-label">Vencidas</label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="radio" checked={estadoFiltro === "Anulada"} onChange={() => setEstadoFiltro("Anulada")} />
            <label className="form-check-label">Anuladas</label>
          </div>

          <button className="btn btn-outline-secondary btn-sm mt-2 mt-md-0" onClick={() => { setSearchTerm(""); setEstadoFiltro("Todos"); }}>
            Limpiar filtros
          </button>
        </div>

        <div className="table-responsive">
          <FacturaTable
            facturas={currentFacturas}
            onDelete={handleDeleteClick}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
        </div>

      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <DeleteModal
      show={showModal}
      onClose={() => setShowModal(false)}
      onConfirm={handleDelete}
    />

    </div>
  );

}

export default Facturas;