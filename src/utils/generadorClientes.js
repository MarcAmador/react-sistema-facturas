const NOMBRES = [
  "Juan", "María", "Carlos", "Ana", "Luis", "Sofía", "José", "Daniela", "Miguel", "Paola",
  "Fernando", "Andrea", "Javier", "Valeria", "Ricardo", "Camila", "Alejandro", "Patricia", "Kevin", "Gabriela"
];

const APELLIDOS = [
  "Pérez", "López", "García", "Ramírez", "Morales", "Castillo", "Rodríguez", "Hernández", "González", "Cruz",
  "Méndez", "Santos", "Ruiz", "Vásquez", "Flores", "Martínez", "Ortiz", "Reyes", "Chávez", "Herrera"
];

const ESTADOS = ["Pendiente", "Pagada", "Vencida", "Anulada"];

export function transformarFactura(factura) {
  const index = factura.id - 1;
  const indiceNombre = index % NOMBRES.length;
  const ronda = Math.floor(index / NOMBRES.length);
  const indiceApellido = (indiceNombre + ronda) % APELLIDOS.length;

  return {
    ...factura,
    cliente: `${NOMBRES[indiceNombre]} ${APELLIDOS[indiceApellido]}`,
    estado: ESTADOS[factura.id % ESTADOS.length]
  };
}