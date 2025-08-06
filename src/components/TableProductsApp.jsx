import { useState } from "react";
import ModalUpdateApp from "./ModalUpdateApp";

const TableProductsApp = ({ products, borrarProducto, updateProduct }) => {
  const [producto, setProducto] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (product) => {
    setProducto(product);
    setShow(true);
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th scope="row">{product.id}</th>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <div className="d-flex gap-2">
                  <button
                    onClick={() => borrarProducto(product)}
                    className="btn btn-danger"
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
                  <button
                    onClick={() => handleShow(product)}
                    className="btn btn-warning"
                  >
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {show && (
        <ModalUpdateApp
          show={show}
          handleClose={handleClose}
          producto={producto}
          updateProduct={updateProduct}
        />
      )}
    </>
  );
};

export default TableProductsApp;
