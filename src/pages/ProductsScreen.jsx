import { useEffect, useState } from "react";
import CardProductApp from "../components/CardProductApp";
import clientAxios from "../helpers/clientAxios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ProductsScreen = () => {
  const MySwal = withReactContent(Swal);
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Función para obtener productos del backend
  const getProducts = async () => {
    try {
      setLoading(true);
      const respuesta = await clientAxios.get("/productos");

      if (respuesta.status === 200) {
        setProducts(respuesta.data.productos || respuesta.data);
        console.log(products);
        setCurrentProducts(respuesta.data.productos || respuesta.data);
        localStorage.setItem("productos", JSON.stringify(respuesta.data));
        console.log(respuesta.data);
      } else {
        MySwal.fire({
          title: "Error",
          text: "No se pudieron cargar los productos",
          icon: "error",
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Hubo un error al cargar los productos",
        icon: "error",
      });
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    filtrarProductos();
  }, [inputValue, products]);

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const filtrarProductos = () => {
    if (inputValue) {
      const filtro = products.filter(
        (item) =>
          item.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
          item.nombreProducto?.toLowerCase().includes(inputValue.toLowerCase())
      );
      setCurrentProducts(filtro);
    } else {
      setCurrentProducts(products);
    }
  };

  return (
    <div className="container">
      <div className="row py-5">
        <div className="col">
          <h1>Nuestros Mush para vos</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar productos..."
            value={inputValue}
            onChange={handleChange}
          />
        </div>
      </div>

      {loading ? (
        <div className="row">
          <div className="col text-center">
            <h3>Cargando productos...</h3>
          </div>
        </div>
      ) : currentProducts.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {currentProducts.map((product) => (
            <CardProductApp key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="row">
          <div className="col text-center">
            <h3>No se encontraron productos</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsScreen;
