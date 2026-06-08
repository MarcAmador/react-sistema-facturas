
function SearchBar({ searchTerm, setSearchTerm, setCurrentPage }) {
  return (
    <div className="mb-3">

      <input
        type="text"
        className="form-control"
        style={{ minWidth: "450px" }}
        placeholder="Buscar cliente o ID"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

    </div>
  );
}

export default SearchBar;