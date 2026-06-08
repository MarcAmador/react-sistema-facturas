import { createContext, useContext, useState, useEffect } from "react";
import Toast from "../components/Toasts";

const ToastContext = createContext();

export function ToastProvider({ children }) {

  const [toast, setToast] = useState(null);

  const showToast = (
    message,
    type = "success"
  ) => {

    setToast({
      message,
      type,
    });

  };

  useEffect(() => {

    if (!toast) return;

    const timer = setTimeout(() => {

      setToast(null);

    }, 3000);

    return () => clearTimeout(timer);

  }, [toast]);

  return (
    <ToastContext.Provider value={{ showToast }}>

      {children}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}

    </ToastContext.Provider>
  );
}

export function useToast() {

  return useContext(ToastContext);

}