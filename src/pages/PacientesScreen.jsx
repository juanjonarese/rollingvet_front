import { useState, useEffect } from "react";
import clientAxios from "../helpers/clientAxios";
import CardFichaApp from "../components/CardFichaApp";
const PacientesScreen = () => {
  const [fichas, setFichas] = useState([]);

  const traerFichas = async () => {
    try {
      const respuesta = await clientAxios.get("/fichas");
      const data = respuesta.data;
      setFichas(data.fichas || []);
    } catch (error) {
      console.error("No fue posible cargar las fichas", error);
    }
  };

  useEffect(() => {
    traerFichas();
  }, []);

  return (
    <div className="container my-4 ">
      <h1 className="mb-4">Listado de Pacientes</h1>
      <div className="row">
        {fichas.length === 0 ? (
          <p>No hay fichas registradas</p>
        ) : (
          fichas.map((ficha) => (
            <div key={ficha._id} className="col-md-6 mb-3">
              <CardFichaApp ficha={ficha} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PacientesScreen;
