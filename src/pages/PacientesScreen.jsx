import { useState, useEffect } from "react";
import clientAxios from "../helpers/clientAxios"
import CardFichaApp from "../components/CardFichaApp"

const PacientesScreen = () => {
  const [fichas, setFichas] = useState([]);
//   const [currentFichas, setCurrentFichas] = useState([]);

  const traerFichas = async () => {
    try{
      const respuesta = await clientAxios.get("/fichas")
      const data = respuesta.data
      setFichas(data.fichas)
    }catch(error){
      console.error("No fue posible cargar las fichas", error)
    }
  } 

  useEffect(() => {
  traerFichas();

  console.log(fichas)
}, []);
  return (
    <div className="container">
        <CardFichaApp/>
        {/* {loading ? (
        <div className="row">
          <div className="col text-center">
            <h3>Cargando fichas...</h3>
          </div>
        </div>
      ) : currentProducts.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {currentProducts.map(() => (
            <CardFichaApp />
          ))}
        </div>
      ) : (
        <div className="row">
          <div className="col text-center">
            <h3>No se encontraron fichas</h3>
          </div>
        </div>
      )} */}
    </div>
  )
}

export default PacientesScreen