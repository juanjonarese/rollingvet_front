import { useState, useEffect } from "react";
import clientAxios from "../helpers/clientAxios";
import CardFichaApp from "../components/CardFichaApp";
import FormFichasCRUD from "../components/FormFichasCRUD"
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

    const addFicha = async (nuevaFicha) => {
    try {
      const response = await clientAxios.post("/fichas", nuevaFicha);
      console.log("Ficha guardada:", response.data);

      setFichas([...fichas, response.data]);
    } catch (error) {
      console.error("Error al agregar ficha:", error);
    }
  }

  return (
    <>
    <FormFichasCRUD addFicha={addFicha} />
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
