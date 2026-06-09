function SearchBar({ searchTerm, setSearchTerm, setCurrentPage }) {
  return (
    <div className="mb-3 w-100">
      <div className="input-group">
        <span className="input-group-text bg-light border-end-0">
          <i className="bi bi-search text-muted"></i>
        </span>
        <input
          type="text"
          className="form-control border-start-0 ps-0"
          placeholder="Buscar por cliente o ID de factura..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}

export default SearchBar;