import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

import FacturaForm from "../components/FacturaForm";
import { obtenerFacturaPorId } from "../services/facturaService";
import LoadingSpinner from "../components/LoadingSpinner";

function EditarFactura() {

  const { id } = useParams();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {

    async function cargarFactura() {

      const factura = await obtenerFacturaPorId(id);

      setTitulo(factura.title);
      setDescripcion(factura.body);

      setLoading(false);
    }

    cargarFactura();

  }, [id]);

const handleSubmit = (e) => {
  e.preventDefault();

  console.log({
    id,
    titulo,
    descripcion,
  });

  showToast("Factura actualizada correctamente", "success");

  setTimeout(() => {
    navigate(`/facturas/${id}`);
  }, 1000);
};

  if (loading) {
    return (
      <LoadingSpinner
        message="Cargando factura..."
      />
    );
  }

  return (
    <>
    
    <Link
      to="/facturas"
      className="btn btn-outline-secondary mb-3"
    >
      <i className="bi bi-arrow-left"></i>
      Volver
    </Link>

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
          label: "Editar",
        },
      ]}
    />

    <div className="card">

      <div className="card-body">

        <h1>Editar Factura</h1>

        <FacturaForm
          titulo={titulo}
          descripcion={descripcion}
          onTituloChange={setTitulo}
          onDescripcionChange={setDescripcion}
          onSubmit={handleSubmit}
          textoBoton="Actualizar"
        />

      </div>

    </div>
    </>
  );
}

export default EditarFactura;