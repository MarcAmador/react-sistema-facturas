//Importar useContext para consumir el contexto de autenticación
import { useContext } from "react";

//Importar el contexto de autenticación para usarlo en este hook
import { AuthContext } from "../context/AuthContext";

//Hook personalizado para usar el contexto de autenticación en cualquier componente
export function useAuth() {
  return useContext(AuthContext);
}