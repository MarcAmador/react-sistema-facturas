//Importar createContext y useState para crear el contexto de autenticación
import { createContext, useState, useEffect } from "react";

//Crear el contexto de autenticación y exportarlo
export const AuthContext = createContext();

//Crear el proveedor del contexto de autenticación
export function AuthProvider({ children }) {

    //Estado para almacenar la información del usuario, inicialmente null (no autenticado)
  const [user, setUser] = useState(() => {

  const savedUser =
      localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;

  });

  //Función para iniciar sesión, recibe el nombre de usuario y actualiza el estado del usuario
const login = (username) => {

  const fakeUser = {
    username,
  };

  const fakeToken =
    "fake-jwt-token-12345";

  localStorage.setItem(
    "user",
    JSON.stringify(fakeUser)
  );

  localStorage.setItem(
    "token",
    fakeToken
  );

  setUser(fakeUser);

};

  //Función para cerrar sesión, solo establece el usuario a null
  const logout = () => {

    localStorage.removeItem("user");

    localStorage.removeItem("token");

    setUser(null);

  };

  const token = localStorage.getItem("token");

  return (
    // Todos los componentes hijos tendrán acceso a user, login y logout a través del contexto
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
        {/* Renderizar los componentes hijos que estén envueltos por el proveedor del contexto */}
      {children}
    </AuthContext.Provider>
  );
}