import {
  createContext,
  useState,
  useEffect,
} from "react";

import {
  obtenerFacturas,
  crearFactura as apiCrearFactura,
  actualizarFactura as apiActualizarFactura,
  eliminarFactura as apiEliminarFactura,
} from "../services/facturaService";

export const FacturaContext =
  createContext();

export function FacturaProvider({
  children,
}) {

  const [facturas, setFacturas] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {

    cargarFacturas();

  }, []);

    async function cargarFacturas() {

    try {

        const guardadas =
        localStorage.getItem(
            "facturas"
        );

        if (guardadas) {

        setFacturas(
            JSON.parse(guardadas)
        );

        return;

        }

        const datos =
        await obtenerFacturas();

        setFacturas(datos);

        localStorage.setItem(
        "facturas",
        JSON.stringify(datos)
        );

    } catch {

        setError(
        "No se pudieron cargar las facturas."
        );

    } finally {

        setLoading(false);

    }

    }

  async function crearFactura(
    nuevaFactura
  ) {

    const response =
      await apiCrearFactura(
        nuevaFactura
      );

    const facturaCreada = {

      ...nuevaFactura,

      id: Date.now(),

    };

    setFacturas((prev) => {

    const nuevasFacturas = [

        facturaCreada,

        ...prev,

    ];

    localStorage.setItem(
        "facturas",
        JSON.stringify(
        nuevasFacturas
        )
    );

    return nuevasFacturas;

    });

    return response;

  }

  async function editarFactura(
    id,
    datosActualizados
  ) {

    await apiActualizarFactura(
      id,
      datosActualizados
    );

    setFacturas((prev) => {

    const actualizadas =
        prev.map((factura) =>

        factura.id === Number(id)

            ? {
                ...factura,
                ...datosActualizados,
            }

            : factura

        );

    localStorage.setItem(
        "facturas",
        JSON.stringify(
        actualizadas
        )
    );

    return actualizadas;

    });

  }

  async function eliminarFactura(
    id
  ) {

    await apiEliminarFactura(id);

    setFacturas((prev) => {

    const restantes =
        prev.filter(

        (factura) =>

            factura.id !== Number(id)

        );

    localStorage.setItem(
        "facturas",
        JSON.stringify(
        restantes
        )
    );

    return restantes;

    });

  }

  return (
    <FacturaContext.Provider
      value={{
        facturas,
        loading,
        error,
        crearFactura,
        editarFactura,
        eliminarFactura,
      }}
    >
      {children}
    </FacturaContext.Provider>
  );

}