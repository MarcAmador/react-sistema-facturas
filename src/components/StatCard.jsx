function StatCard({ titulo, valor }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body text-center">

        <h5 className="card-title">
          {titulo}
        </h5>

        <h2>
          {valor}
        </h2>

      </div>
    </div>
  );
}

export default StatCard;