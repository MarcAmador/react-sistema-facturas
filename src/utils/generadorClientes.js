// src/utils/generadorClientes.js

const nombres = [
  "Juan", "María", "Carlos", "Ana", "Luis", "Sofía", "José", "Daniela", "Miguel", "Paola",
  "Fernando", "Andrea", "Javier", "Valeria", "Ricardo", "Camila", "Alejandro", "Patricia", "Kevin", "Gabriela"
];

const apellidos = [
  "Pérez", "López", "García", "Ramírez", "Morales", "Castillo", "Rodríguez", "Hernández", "González", "Cruz",
  "Méndez", "Santos", "Ruiz", "Vásquez", "Flores", "Martínez", "Ortiz", "Reyes", "Chávez", "Herrera"
];

const estados = [
  "Pendiente", "Pagada", "Vencida", "Anulada"
];


export function transformarFactura(factura) {
  const indiceNombre = (factura.id - 1) % nombres.length;
  const ronda = Math.floor((factura.id - 1) / nombres.length);
  const indiceApellido = (indiceNombre + ronda) % apellidos.length;

  return {
    ...factura,
    cliente: `${nombres[indiceNombre]} ${apellidos[indiceApellido]}`,
    estado: estados[factura.id % estados.length]
  };
}