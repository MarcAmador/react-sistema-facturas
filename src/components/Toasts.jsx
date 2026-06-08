function Toast({
  message,
  type = "success",
}) {

  let icon = "bi-check-circle-fill";

  if (type === "error") {
    icon = "bi-x-circle-fill";
  }

  if (type === "info") {
    icon = "bi-info-circle-fill";
  }

  return (

    <div
      className={`custom-toast ${
        type === "success"
          ? "toast-success"
          : type === "error"
          ? "toast-error"
          : "toast-info"
      }`}
    >

      <i
        className={`${icon} me-2`}
      ></i>

      {message}

    </div>

  );
}

export default Toast;