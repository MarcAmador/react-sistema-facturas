import { useState, useMemo, useCallback } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";
import DeleteModal from "../components/DeleteModal";
import Breadcrumb from "../components/Breadcrumb";
import FacturaTable from "../components/FacturaTable";
import SearchBar from "../components/SearchBar";
import { useFacturas } from "../hooks/useFacturas";
import { useToast } from "../context/ToastContext";

function Facturas() {
  const { facturas, loading, error, eliminarFactura } = useFacturas();
  const { showToast } = useToast();

  const [showModal, setShowModal] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const facturasFiltradas = useMemo(() => {
    return facturas.filter((factura) => {
      const coincideBusqueda =
        factura.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        factura.id.toString().includes(searchTerm);
      const coincideEstado =
        estadoFiltro === "Todos" ? true : factura.estado === estadoFiltro;
      return coincideBusqueda && coincideEstado;
    });
  }, [facturas, searchTerm, estadoFiltro]);

  const facturasOrdenadas = useMemo(() => {
    return [...facturasFiltradas].sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [facturasFiltradas, sortField, sortDirection]);

  const totalPages = Math.ceil(facturasFiltradas.length / itemsPerPage);

  const currentFacturas = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return facturasOrdenadas.slice(startIndex, startIndex + itemsPerPage);
  }, [facturasOrdenadas, currentPage]);

  const handleDeleteClick = useCallback((factura) => {
    setFacturaSeleccionada(factura);
    setShowModal(true);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!facturaSeleccionada) return;
    await eliminarFactura(facturaSeleccionada.id);
    showToast("Factura eliminada", "success");
    setShowModal(false);
  }, [eliminarFactura, facturaSeleccionada, showToast]);

  const handleSort = useCallback((field) => {
    setSortField((prevField) => {
      if (prevField === field) {
        setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
        return prevField;
      } else {
        setSortDirection("asc");
        return field;
      }
    });
  }, []);

  if (loading) return <LoadingSpinner message="Cargando facturas..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="card">
      <div className="card-body">
        <h1>Listado de Facturas</h1>
        <Breadcrumb items={[{ label: "Inicio", path: "/dashboard" }, { label: "Facturas" }]} />

        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          setCurrentPage={setCurrentPage} 
        />

        <div className="d-flex flex-column flex-md-row gap-2 gap-md-3 mb-3 align-items-start align-items-md-center">
          <strong>Filtrar por:</strong>

          {["Todos", "Pendiente", "Pagada", "Vencida", "Anulada"].map((estado) => (
            <div className="form-check" key={estado}>
              <input 
                className="form-check-input" 
                type="radio" 
                checked={estadoFiltro === estado} 
                onChange={() => setEstadoFiltro(estado)} 
              />
              <label className="form-check-label">
                {estado === "Todos" ? "Todos" : `${estado}s`}
              </label>
            </div>
          ))}

          <button 
            className="btn btn-outline-secondary btn-sm mt-2 mt-md-0" 
            onClick={() => { setSearchTerm(""); setEstadoFiltro("Todos"); }}
          >
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