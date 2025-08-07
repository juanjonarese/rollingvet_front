import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clientAxios from "../helpers/clientAxios";
import "../css/OneProduct.css";

const OneProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        setLoading(true);
        const respuesta = await clientAxios.get(`/productos/${id}`);
        setProduct(respuesta.data.producto);
        setError(null);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    obtenerProducto();
  }, [id]);

  const handleComprar = async () => {
    try {
      console.log("Comprando producto:", product);
      alert(`¡Producto "${product.titulo}" agregado al carrito!`);
    } catch (error) {
      console.error("Error al comprar:", error);
      alert("Error al procesar la compra");
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row py-5">
          <div className="col text-center">
            <h3>Cargando información del producto...</h3>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="row py-5">
          <div className="col">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row py-5">
        <div className="col text-center">
          <h1 className="fw-bold texto-home">Detalle de producto</h1>
        </div>
      </div>

      <div className="product-card">
        <div className="product-image">
          <img src={product.imagen} alt={product.titulo} />
        </div>
        <div className="product-info">
          <h2>{product.titulo}</h2>
          <p>{product.descripcion}</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="buy-button btn-login" onClick={handleComprar}>
              🛒 Comprar Ahora
            </button>
            <div className="product-price">${product.precio}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneProductScreen;
