import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";

const ModalUpdateApp = (props) => {
  const { show, handleClose, producto, updateProduct } = props;

  const { register, handleSubmit } = useForm();
  const actualizarProducto = (datos) => {
    updateProduct(producto.id, datos);
    handleClose();
  };
  //   console.log(producto);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(actualizarProducto)}>
          <div className="mb-4">
            <label className="form-label fw-bold">Nombre del Producto</label>
            <input
              type="text"
              className="form-control form-control-lg"
              {...register("title", {
                required: true,
                value: producto.title,
              })}
              placeholder="Ej: Smartphone X200"
            />
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <label className="form-label fw-bold">Precio</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  {...register("price", {
                    required: true,
                    value: producto.price,
                  })}
                  step="0.01"
                  min="0"
                  placeholder="Ej: 299.99"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Descripción</label>
            <textarea
              className="form-control"
              {...register("description", {
                required: true,
                value: producto.description,
              })}
              rows="4"
              placeholder="Describe detalladamente el producto..."
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">URL de la Imagen</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-image"></i>
              </span>
              <input
                type="url"
                className="form-control"
                {...register("image", {
                  required: true,
                  value: producto.image,
                })}
                placeholder="https://ejemplo.com/imagen.jpg"
                pattern="https://.*"
              />
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-lg btn-warning">
              <i className="bi bi-save me-2"></i>Actualizar Producto
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalUpdateApp;
