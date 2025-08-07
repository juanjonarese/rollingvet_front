import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const FormAddProductApp = ({ addProduct }) => {
  const MySwal = withReactContent(Swal);

  const { register, handleSubmit, reset, setFocus } = useForm();

  const agregarProducto = (datos) => {
    addProduct(datos);
    reset();
    setFocus("title");
    MySwal.fire({
      title: "El producto se cargó con éxito!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div className="d-flex ">
      <div className="container justify-content-center">
        <div className="row my-4 ">
          <form onSubmit={handleSubmit(agregarProducto)}>
            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Nombre del Producto</label>
              <input
                type="text"
                className="form-control form-control-lg"
                {...register("titulo", { required: true })}
                placeholder="Ej: Alimento para perros"
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
                    {...register("precio", { required: true })}
                    step="0.01"
                    min="0"
                    placeholder="Ej: 299.99"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Descripción</label>
              <textarea
                className="form-control"
                {...register("descripcion", { required: true })}
                rows="4"
                placeholder="Describe detalladamente el producto..."
              ></textarea>
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">URL de la Imagen</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-image"></i>
                </span>
                <input
                  type="url"
                  className="form-control"
                  {...register("image", { required: true })}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  pattern="https://.*"
                />
              </div>
            </div>

            <div className="d-grid col-md-6">
              <button type="submit" className="btn btn-lg btn-login">
                <i className="bi bi-save me-2  "></i>Guardar Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddProductApp;
