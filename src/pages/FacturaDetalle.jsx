import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

import DeleteModal from "../components/DeleteModal";
import { useFacturas } from "../hooks/useFacturas";
import LoadingSpinner from "../components/LoadingSpinner";
import Toast from "../components/Toasts";
import { useToast } from "../context/ToastContext";
import InvoicePreview from "../components/InvoicePreview";

function FacturaDetalle() {

  const { id } = useParams();

  const [factura, setFactura] = useState(null);

  const { facturas, eliminarFactura } = useFacturas();

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const { showToast } = useToast();

  const navigate = useNavigate();


  const handleDelete = async () => {

    try{

      await eliminarFactura(
        factura.id
      );
  
      showToast(
        "Factura eliminada correctamente",
        "success"
      );
  
      setShowModal(false);
  
      setTimeout(() => {
  
        navigate("/facturas");
  
      }, 1000);
    } catch {

      showToast(
        "No se pudo eliminar la factura",
        "danger"
      )
    }
  };

  useEffect(() => {

    const facturaEncontrada =
      facturas.find(
        (f) => f.id === Number(id)
      );

    if (facturaEncontrada) {

      setFactura(facturaEncontrada);

      setLoading(false);

    }

  }, [id, facturas]);

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

      <InvoicePreview
        factura={{
          id: factura.id,
          cliente: factura.cliente,
          titulo: factura.title,
          descripcion: factura.body,
          estado: factura.estado,
        }}
      />

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