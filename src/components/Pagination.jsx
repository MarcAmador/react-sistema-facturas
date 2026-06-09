function Pagination({ currentPage, totalPages, onPageChange }) {
  // 1. Lógica para determinar qué 3 páginas mostrar
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  // Ajustes para los extremos (si estamos en la página 1 o en la última)
  if (currentPage === 1) {
    endPage = Math.min(totalPages, 3);
  } else if (currentPage === totalPages) {
    startPage = Math.max(1, totalPages - 2);
  }

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  // 2. Si no hay páginas o solo hay 1, no mostramos la paginación
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-4">
      {/* Añadimos pagination-sm para que se vea bien en teléfonos */}
      <ul className="pagination pagination-sm justify-content-center">
        
        {/* Botón PRIMERO */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(1)}
            aria-label="Primero"
          >
            <i className="bi bi-chevron-double-left"></i>
          </button>
        </li>

        {/* Botón ANTERIOR */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Anterior"
          >
             <i className="bi bi-chevron-left"></i>
          </button>
        </li>

        {/* NÚMEROS DE PÁGINA (Máximo 3) */}
        {visiblePages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        {/* Botón SIGUIENTE */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Siguiente"
          >
             <i className="bi bi-chevron-right"></i>
          </button>
        </li>

        {/* Botón ÚLTIMO */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(totalPages)}
            aria-label="Último"
          >
            <i className="bi bi-chevron-double-right"></i>
          </button>
        </li>

      </ul>
    </nav>
  );
}

export default Pagination;