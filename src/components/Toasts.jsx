function Toast({ message, type = "success" }) {
  const toastConfig = {
    success: {
      className: "toast-success",
      icon: "bi-check-circle-fill",
    },
    error: {
      className: "toast-error",
      icon: "bi-x-circle-fill",
    },
    info: {
      className: "toast-info",
      icon: "bi-info-circle-fill",
    },
  };

  const currentConfig = toastConfig[type] || toastConfig.success;

  return (
    <div className={`custom-toast ${currentConfig.className}`}>
      <i className={`bi ${currentConfig.icon} me-2`}></i>
      {message}
    </div>
  );
}

export default Toast;