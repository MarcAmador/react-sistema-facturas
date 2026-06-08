import { useAuth } from "../hooks/useAuth";
import StatCard from "../components/StatCard";

function Dashboard() {

  const { user } = useAuth();

  return (
    <>
      <h1 className="mb-4">
        Dashboard
      </h1>

      <div className="row">

        <div className="col-md-4">

          <StatCard
            titulo="Usuario"
            valor={user?.username}
          />

        </div>

        <div className="col-md-4">

          <StatCard
            titulo="Facturas"
            valor="100"
          />

        </div>

        <div className="col-md-4">

          <StatCard
            titulo="Estado"
            valor="Activo"
          />

        </div>

      </div>
    </>
  );
}

export default Dashboard;