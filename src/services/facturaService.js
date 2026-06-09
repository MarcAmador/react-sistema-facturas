// src/services/facturaService.js
import api from "./api";
// 1. Importamos la función transformadora desde utilidades
import { transformarFactura } from "../utils/generadorClientes"; 

export async function obtenerFacturas() {
  const response = await api.get("/posts");
  // Mapeamos el arreglo transformando cada elemento
  return response.data.map(transformarFactura);
}

export async function obtenerFacturaPorId(id) {
  const response = await api.get(`/posts/${id}`);
  // Transformamos el objeto único recibido
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