import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import InvoicePreview from "../components/InvoicePreview";

import FacturaForm from "../components/FacturaForm";
import { useToast } from "../context/ToastContext";

function NuevaFactura() {

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [estado, setEstado] = useState("Pendiente");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState("");

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (titulo.trim().length < 5) {

    showToast(
      "El título debe tener al menos 5 caracteres",
      "error"
    );

    return;
  }

  if (descripcion.trim().length < 10) {

    showToast(
      "La descripción debe tener al menos 10 caracteres",
      "error"
    );

    return;
  }

  setLoading(true);

  try {

    console.log({
      titulo,
      descripcion,
      estado,
    });

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 1500)
    );

    showToast(
      "Factura creada correctamente",
      "success"
    );

    setTitulo("");
    setDescripcion("");
    setEstado("Pendiente");

    setTimeout(() => {

      navigate("/facturas");

    }, 1000);

  } finally {

    setLoading(false);

  }

};

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
          label: "Nueva Factura",
        },
      ]}
    />
    
    <div className="card">

      <div className="card-body">

        <h1>Nueva Factura</h1>

        <FacturaForm
          cliente={cliente}
          titulo={titulo}
          descripcion={descripcion}
          estado={estado}
          onClienteChange={setCliente}
          onTituloChange={setTitulo}
          onDescripcionChange={setDescripcion}
          onEstadoChange={setEstado}
          onSubmit={handleSubmit}
          textoBoton={
            loading
              ? "Guardando..."
              : "Guardar"
          }
          loading={loading}
        />

        <InvoicePreview
          factura={{
            id: "NUEVA",
            cliente,
            titulo,
            descripcion,
            estado,
          }}
        />

      </div>

    </div>
    </>
  );
}

export default NuevaFactura;