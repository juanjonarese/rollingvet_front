import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FormAddProductApp from "../components/FormAddProductApp";
import TableProductsApp from "../components/TableProductsApp";
// Importar formulario para agregar producto
// Importar Tabla de productos

const AdminProductsScreen = () => {
  const MySwal = withReactContent(Swal);
  const [productos, setProductos] = useState(
    JSON.parse(localStorage.getItem("productos")) || []
  );

  const addProduct = (datos) => {
    //   const ultimoElemento=productos.at(-1)
    //  const id= ultimoElemento.id+1

    // {
    //   id,
    //   title,
    //   description,
    //   image

    // }
    const id = new Date().getTime();
    const data = [...productos, { id, ...datos }];
    setProductos(data);
    localStorage.setItem("productos", JSON.stringify(data));
  };

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

    // const validar = confirm(`Va a eliminar el producto: ${product.title}`);
    // if (validar) {
    //   setProductos(newProducts);
    //   localStorage.setItem("productos", JSON.stringify(newProducts));
    // }
  };

  const updateProduct = (id, datos) => {
    // {
    //   title:'nuevo título'
    // }
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
