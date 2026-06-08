import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

import DeleteModal from "../components/DeleteModal";
import { obtenerFacturaPorId } from "../services/facturaService";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toasts";
import { useToast } from "../context/ToastContext";

function FacturaDetalle() {

  const { id } = useParams();

  const [factura, setFactura] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [toast, setToast] = useState("");

  const { showToast } = useToast();

  const navigate = useNavigate();

  const handleDelete = () => {

    showToast(
      "Factura eliminada correctamente",
      "success"
    );

    setShowModal(false);
    setTimeout(() => {
      navigate(`/facturas`);
    }, 1000);

  };

  useEffect(() => {

    if (!toast) return;

    const timer = setTimeout(() => {

      setToast("");

    }, 3000);

    return () => clearTimeout(timer);

  }, [toast]);

  useEffect(() => {

    async function cargarFactura() {

      const datos = await obtenerFacturaPorId(id);

      setFactura(datos);

      setLoading(false);
    }

    cargarFactura();

  }, [id]);

  if (loading) {
    return (
      <LoadingSpinner
        message="Cargando detalle de factura..."
      />
    );
  }

  return (
    <>

    <Breadcrumb
      items={[
        {
          label: "Inicio",
          path: "/dashboard",
        },
        {
          label: "Facturas",
          path: "/facturas",
        },
        {
          label: "Detalle",
        },
      ]}
    />

    <div className="card">

      <div className="card-body">

      <h1 className="mb-4">
        <i className="bi bi-receipt me-2"></i>
        Factura #{factura.id}
      </h1>

        <p>
          <strong>ID:</strong> {factura.id}
        </p>

        <p>
          <strong>Cliente:</strong>{" "}
          {factura.cliente}
        </p>

        <p>
          <strong>Estado:</strong>{" "}

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
        </p>

        <p>
          <strong>Contenido:</strong>
        </p>

        <p>{factura.body}</p>

      </div>

      <div className="d-flex justify-content-center gap-2 mt-4 mb-4">

        <Link
          to="/facturas"
          className="btn btn-outline-secondary"  >
          <i className="bi bi-arrow-left"></i>
          {" "}Volver
        </Link>

        <Link
          to={`/facturas/editar/${factura.id}`}
          className="btn btn-warning"
        >
          <i className="bi bi-pencil-fill"></i>
          {" "}Editar
        </Link>

        <button
          className="btn btn-danger"
          onClick={() => setShowModal(true)}
        >
          <i className="bi bi-trash-fill"></i>
          {" "}Eliminar
        </button>

      </div>

      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />

    </div>
    </>
  );
}

export default FacturaDetalle;