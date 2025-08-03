import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import clientAxios from "../helpers/clientAxios";

const ChangePassScreen = () => {
  const MySwal = withReactContent(Swal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const changePass = async (data) => {
    const [nuevaContrasenia, setNuevaContrasenia] = useState("");
    const [confirmarNuevaContrasenia, setConfirmarNuevaContrasenia] =
      useState("");

    const handlePass = async (e) => {
      try {
        const tokenUrl = new URLSearchParams(location.search).get("token");

        if (nuevaContrasenia === confirmarNuevaContrasenia) {
          const respuesta = await clientAxios.post(
            `usuarios/changePass?token=${tokenUrl}`,
            {},
            configHeaders
          );
        } else {
          alert("las contraseñas no coincide");
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  return (
    <div className="register-container container my-3">
      <div className="row justify-content-center py-3">
        <div className="col-md-8 col-lg-6">
          <div className="login-container p-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3">Cambiar Contraseña</h2>
            </div>

            <form onSubmit={handleSubmit(changePass)}>
              {/* Correo */}
              <div className="mb-4 position-relative">
                <label className="form-label">Nueva Contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg ps-4"
                  {...register("nuevaContrasenia", { required: true })}
                  placeholder="••••••••"
                />
                {errors.contrasenia && (
                  <p role="alert" className="text-danger">
                    El campo es obligatorio
                  </p>
                )}
              </div>
              <div className="mb-4 position-relative">
                <label className="form-label">Repetir Contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg ps-4"
                  {...register("confirmarNuevaContrasenia", { required: true })}
                  placeholder="••••••••"
                />
                {errors.contrasenia && (
                  <p role="alert" className="text-danger">
                    El campo es obligatorio
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="registro-btn btn btn-custom btn-lg w-100 mb-3"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangePassScreen;
