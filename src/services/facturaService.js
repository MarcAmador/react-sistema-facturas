import api from "./api";
import { transformarFactura } from "../utils/generadorClientes";

export async function obtenerFacturas() {
  const response = await api.get("/posts");
  return response.data.map(transformarFactura);
}

export async function obtenerFacturaPorId(id) {
  const response = await api.get(`/posts/${id}`);
  return transformarFactura(response.data);
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