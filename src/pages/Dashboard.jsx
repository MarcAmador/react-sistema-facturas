import { useFacturas } from "../hooks/useFacturas";
import { Link } from "react-router-dom";

function Dashboard() {
  const { facturas } = useFacturas();
  const totalFacturas = facturas.length;

  // Métricas
  const pendientes = facturas.filter((f) => f.estado === "Pendiente").length;
  const pagadas = facturas.filter((f) => f.estado === "Pagada").length;
  const vencidas = facturas.filter((f) => f.estado === "Vencida").length;

  // Clonamos e invertimos para obtener verdaderamente las LATEST invoices
  const ultimasFacturas = [...facturas].reverse().slice(0, 5);

  // Protección contra división por cero
  const porcentajePagadas = totalFacturas > 0 ? (pagadas / totalFacturas) * 100 : 0;
  const porcentajePendientes = totalFacturas > 0 ? (pendientes / totalFacturas) * 100 : 0;
  const porcentajeVencidas = totalFacturas > 0 ? (vencidas / totalFacturas) * 100 : 0;

  // Función helper para pintar los Badges de la tabla
  const getBadgeClass = (estado) => {
    if (estado === "Pagada") return "bg-success-subtle text-success border border-success-subtle";
    if (estado === "Pendiente") return "bg-warning-subtle text-warning-emphasis border border-warning-subtle";
    if (estado === "Vencida") return "bg-danger-subtle text-danger border border-danger-subtle";
    return "bg-secondary-subtle text-secondary";
  };

  return (
    <div className="container py-2">
      <h2 className="mb-4 fw-bold text-dark">Panel de Control</h2>

      {/* 1. SECCIÓN DE TARJETAS (Métricas Superiores de forma horizontal) */}
      <div className="row g-3 mb-4">
        {/* Total */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card h-100 border-0 border-start border-primary border-4 shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted text-uppercase small mb-1">Total Facturas</h6>
                <h3 className="fw-bold mb-0">{totalFacturas}</h3>
              </div>
              <div className="bg-primary bg-opacity-10 text-primary rounded p-3">
                <i className="bi bi-receipt fs-3"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Pagadas */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card h-100 border-0 border-start border-success border-4 shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted text-uppercase small mb-1">Pagadas</h6>
                <h3 className="fw-bold text-success mb-0">{pagadas}</h3>
              </div>
              <div className="bg-success bg-opacity-10 text-success rounded p-3">
                <i className="bi bi-check-circle fs-3"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Pendientes */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card h-100 border-0 border-start border-warning border-4 shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted text-uppercase small mb-1">Pendientes</h6>
                <h3 className="fw-bold text-warning mb-0">{pendientes}</h3>
              </div>
              <div className="bg-warning bg-opacity-10 text-warning rounded p-3">
                <i className="bi bi-clock-history fs-3"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Vencidas */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card h-100 border-0 border-start border-danger border-4 shadow-sm">
            <div className="card-body d-flex align-items-center justify-content-between">
              <div>
                <h6 className="text-muted text-uppercase small mb-1">Vencidas</h6>
                <h3 className="fw-bold text-danger mb-0">{vencidas}</h3>
              </div>
              <div className="bg-danger bg-opacity-10 text-danger rounded p-3">
                <i className="bi bi-exclamation-triangle fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DISTRIBUCIÓN PRINCIPAL (Dos columnas para Desktop) */}
      <div className="row g-4">
        {/* Columna Izquierda: Tabla principal (Ancha) */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold m-0">Actividad Reciente</h5>
                <span className="badge bg-light text-dark border">Últimas 5</span>
              </div>
              
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th style={{ width: "80px" }}>ID</th>
                      <th>Cliente</th>
                      <th className="text-end">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ultimasFacturas.map((factura) => (
                      <tr key={factura.id}>
                        <td className="fw-bold text-secondary">#{factura.id}</td>
                        <td>{factura.cliente}</td>
                        <td className="text-end">
                          <span className={`badge px-2 py-1 ${getBadgeClass(factura.estado)}`}>
                            {factura.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {ultimasFacturas.length === 0 && (
                      <tr>
                        <td colSpan="3" className="text-center py-4 text-muted">
                          No hay facturas registradas.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Estado de progreso y Accesos Rápidos (Lateral) */}
        <div className="col-12 col-lg-4 d-flex flex-column gap-4">
          
          {/* Barra de Progreso Colectiva */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Balance de Estados</h5>
              <div className="progress rounded-pill mb-2" style={{ height: "16px" }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${porcentajePagadas}%` }}
                  title={`Pagadas: ${porcentajePagadas.toFixed(1)}%`}
                ></div>
                <div 
                  className="progress-bar bg-warning" 
                  style={{ width: `${porcentajePendientes}%` }}
                  title={`Pendientes: ${porcentajePendientes.toFixed(1)}%`}
                ></div>
                <div 
                  className="progress-bar bg-danger" 
                  style={{ width: `${porcentajeVencidas}%` }}
                  title={`Vencidas: ${porcentajeVencidas.toFixed(1)}%`}
                ></div>
              </div>
              <div className="d-flex justify-content-between small text-muted mt-3">
                <span><i className="bi bi-circle-fill text-success me-1"></i> Pagadas</span>
                <span><i className="bi bi-circle-fill text-warning me-1"></i> Pendientes</span>
                <span><i className="bi bi-circle-fill text-danger me-1"></i> Vencidas</span>
              </div>
            </div>
          </div>

          {/* Panel de Acciones Rápidas */}
          <div className="card border-0 shadow-sm flex-grow-1">
            <div className="card-body p-4 d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-bold mb-3">Accesos Rápidos</h5>
                <p className="small text-muted mb-4">Gestione sus comprobantes de forma inmediata con los siguientes accesos directos.</p>
              </div>
              <div className="d-flex flex-column gap-2">
                <Link to="/nueva-factura" className="btn btn-success py-2 fw-semibold">
                  <i className="bi bi-plus-circle me-2"></i> Emitir Nueva Factura
                </Link>
                <Link to="/facturas" className="btn btn-outline-primary py-2 fw-semibold">
                  <i className="bi bi-list-ul me-2"></i> Ir al Listado Completo
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;