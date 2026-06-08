//Hook personalizado para cargar las facturas desde la API
import { useEffect, useState } from "react";
import { obtenerFacturas } from "../services/facturaService";

//Función que devuelve el estado de las facturas y si están cargando o no
export function useFacturas() {

  const [facturas, setFacturas] = useState([]);
  //Estado para indicar si las facturas están cargando, se inicializa en true
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  //Usar useEffect para cargar las facturas al montar el componente
  useEffect(() => {

    //Llamar a la función obtenerFacturas para cargar las facturas desde la API
async function cargarFacturas() {

  try {

      const datos = await obtenerFacturas();

      setFacturas(datos);

  } catch (err) {

    setError(
      "No se pudieron cargar las facturas."
    );

  } finally {

    setLoading(false);

  }
}

    cargarFacturas();

  }, []);

  return {
    facturas,
    loading,
    error,
  };
}