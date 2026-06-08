import api from "./api";

//Datos ficticios
const nombres = [
  "Juan",
  "María",
  "Carlos",
  "Ana",
  "Luis",
  "Sofía",
  "José",
  "Daniela",
  "Miguel",
  "Paola",
  "Fernando",
  "Andrea",
  "Javier",
  "Valeria",
  "Ricardo",
  "Camila",
  "Alejandro",
  "Patricia",
  "Kevin",
  "Gabriela"
];

const apellidos = [
  "Pérez",
  "López",
  "García",
  "Ramírez",
  "Morales",
  "Castillo",
  "Rodríguez",
  "Hernández",
  "González",
  "Cruz",
  "Méndez",
  "Santos",
  "Ruiz",
  "Vásquez",
  "Flores",
  "Martínez",
  "Ortiz",
  "Reyes",
  "Chávez",
  "Herrera"
];

const estados = [
  "Pendiente",
  "Pagada",
  "Vencida",
  "Anulada"
];


function transformarFactura(factura) {

const indiceNombre =
  (factura.id - 1) %
  nombres.length;

const ronda =
  Math.floor(
    (factura.id - 1) /
    nombres.length
  );

const indiceApellido =
  (
    indiceNombre +
    ronda
  ) %
  apellidos.length;

  return {

    ...factura,

      cliente: `${

        nombres[indiceNombre]

      } ${

        apellidos[indiceApellido]

      }`,

    estado:
      estados[
        factura.id %
        estados.length
      ]

  };

}

export async function obtenerFacturas() {

  const response =
    await api.get("/posts");

  const facturas =
    response.data.map(
      transformarFactura
    );

  return facturas;

}

export async function obtenerFacturaPorId(id) {

  const response =
    await api.get(`/posts/${id}`);

  return transformarFactura(
    response.data
  );

}

export async function crearFactura(data) {
  const response = await api.post("/posts", data);
  return response.data;
}

export async function actualizarFactura(id, data) {
  const response = await api.put(`/posts/${id}`, data);
  return response.data;
}

export async function eliminarFactura(id) {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
}