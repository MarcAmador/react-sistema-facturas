import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

import { useFacturas } from "../hooks/useFacturas";
import FacturaForm from "../components/FacturaForm";
import LoadingSpinner from "../components/LoadingSpinner";
import InvoicePreview from "../components/InvoicePreview";

function EditarFactura() {

  const { id } = useParams();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [loading, setLoading] = useState(true);

  const [cliente, setCliente] = useState("");
  const [estado, setEstado] = useState("Pendiente");

  const { showToast } = useToast();

  const {facturas, editarFactura,} = useFacturas();
  const [loadingSave, setLoadingSave] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const factura =
      facturas.find(
        (f) =>
          f.id === Number(id)
      );

      if (factura) {

        setCliente(
          factura.cliente || ""
        );

        setEstado(
          factura.estado || "Pendiente"
        );

        setTitulo(
          factura.title
        );

        setDescripcion(
          factura.body
        );

        setLoading(false);

      }

    }, [id, facturas]);

    const handleSubmit = async (e) => {

      e.preventDefault();

      setLoadingSave(true);

      try {

        await editarFactura(id, {
          cliente,
          estado,
          title: titulo,
          body: descripcion,
        });

        showToast(
          "Factura actualizada correctamente",
          "success"
        );

        navigate(`/facturas/${id}`);

      }catch {

        showToast(
          "No se pudo actualizar la factura",
          "danger"
        )

      } finally {

        setLoadingSave(false);

      }

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
          cliente={cliente}
          estado={estado}
          titulo={titulo}
          descripcion={descripcion}
          onClienteChange={setCliente}
          onEstadoChange={setEstado}
          onTituloChange={setTitulo}
          onDescripcionChange={setDescripcion}
          onSubmit={handleSubmit}
          loading={loadingSave}
          textoBoton="Actualizar"
        />

        <InvoicePreview
          factura={{
            id,
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

export default EditarFactura;