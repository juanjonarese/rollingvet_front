import { useState, useEffect } from "react";
import clientAxios from "../helpers/clientAxios";
import CardFichaApp from "../components/CardFichaApp";
// import FichasCRUD from "../components/FichasCRUD"
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
    <>
        {/* <FichasCRUD/> */}
    <div className="container my-4">
      <div className="row">
        {fichas.length === 0 ? (
          <p>No hay fichas registradas</p>
        ) : (
          fichas.map((ficha) => (
            <div key={ficha._id} className="">
              <CardFichaApp ficha={ficha} />
            </div>
          ))
        )}
      </div>
    </div>
    </>

  );
};

export default PacientesScreen;
