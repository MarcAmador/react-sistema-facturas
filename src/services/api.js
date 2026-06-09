// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000, // 🔴 REQUISITO: Timeout de 10 segundos para evitar peticiones infinitas
});

// Interceptor de Peticiones (Request) - Ya lo tenías perfecto
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔴 REQUISITO: Interceptor de Respuestas (Response) para manejo de errores globales
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa (status 200-299), la dejamos pasar sin tocarla
    return response;
  },
  (error) => {
    // Si el servidor responde con un error de estatus
    if (error.response) {
      const { status } = error.response;

      // Manejo específico del error 401 (Token expirado o inválido)
      if (status === 401) {
        console.warn("Sesión inválida o expirada. Limpiando credenciales...");
        
        // 1. Limpiamos el localStorage para que el estado de la app sepa que no hay sesión
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // 2. Redirección forzada al login de manera segura
        window.location.href = "/login"; 
      }
      
      // Aquí podrías agregar otras respuestas comunes si quisieras (ej: 403, 500)
    } else if (error.code === "ECONNABORTED") {
      console.error("La petición tardó demasiado y superó el timeout.");
    }

    // Siempre debemos retornar la promesa rechazada para que el catch del componente/servicio capte el error
    return Promise.reject(error);
  }
);

export default api;