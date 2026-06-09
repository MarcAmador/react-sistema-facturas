function SearchBar({ searchTerm, setSearchTerm, setCurrentPage }) {
  return (
    <div className="mb-3 w-100">
      <input
        type="text"
        className="form-control w-100"
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