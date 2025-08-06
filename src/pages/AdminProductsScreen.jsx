import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FormAddProductApp from "../components/FormAddProducApp";
import TableProductsApp from "../components/TableProductsApp";
import clientAxios from "../helpers/clientAxios";

console.log("Renderizando AdminProductsScreen");
const AdminProductsScreen = () => {
  const MySwal = withReactContent(Swal);
  const [productos, setProductos] = useState([]);

  const getProducts = async () => {
    try {
      // setLoading(true);
      const respuesta = await clientAxios.get("/productos");
      console.log("RESPUESTA COMPLETA:", respuesta);
      console.log("PRODUCTOS RECIBIDOS:", respuesta.data);

      if (respuesta.status === 200) {
        setProductos(respuesta.data.productos || respuesta.data);
        console.log(respuesta.data.productos || respuesta.data);
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
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProduct = () => {};

  const deleteProduct = (product) => {
    const newProducts = productos.filter(
      (producto) => producto.id !== product.id
    );
    MySwal.fire({
      title: `Va a eliminar el producto: ${product.title}`,
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        setProductos(newProducts);
        localStorage.setItem("productos", JSON.stringify(newProducts));
      }
    });
  };

  const updateProduct = (id, datos) => {
    const index = productos.findIndex((product) => product.id === id);
    const productsLocal = [...productos];
    productsLocal[index] = { ...productsLocal[index], ...datos };
    setProductos(productsLocal);
    localStorage.setItem("productos", JSON.stringify(productsLocal));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Administración de productos</h1>
        </div>
      </div>
      <FormAddProductApp addProduct={addProduct} />
      {/* Formulario para dar de alta producto  */}
      <div className="row">
        <div className="col">
          <h3>Tabla de productos</h3>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TableProductsApp
            products={productos}
            borrarProducto={deleteProduct}
            updateProduct={updateProduct}
          />
          {/* Tabla de productos con botones para borrar y actualizar  */}
        </div>
      </div>
    </div>
  );
};

export default AdminProductsScreen;
