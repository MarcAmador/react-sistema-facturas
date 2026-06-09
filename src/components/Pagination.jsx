function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  if (currentPage === 1) {
    endPage = Math.min(totalPages, 3);
  } else if (currentPage === totalPages) {
    startPage = Math.max(1, totalPages - 2);
  }

  const visiblePages = [];
  for (let i = startPage; i <= endPage; i++) {
    visiblePages.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="pagination pagination-sm justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(1)}
            aria-label="Primero"
          >
            <i className="bi bi-chevron-double-left"></i>
          </button>
        </li>

        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Anterior"
          >
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>

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

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Siguiente"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>

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