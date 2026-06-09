function StatCard({ titulo, valor }) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body text-center d-flex flex-column justify-content-center py-4">
        <h6 className="card-title text-secondary fw-semibold text-uppercase mb-2">
          {titulo}
        </h6>
        <h2 className="display-6 fw-bold text-dark mb-0">
          {valor}
        </h2>
      </div>
    </div>
  );
}

export default StatCard;