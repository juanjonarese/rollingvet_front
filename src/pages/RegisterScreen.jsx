import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import clientAxios from "../helpers/clientAxios";
import "../css/register.css";

const RegisterScreen = () => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const crearUsuario = async (datos) => {
    console.log(datos);

    try {
      const respuesta = await clientAxios.post("/usuarios", datos);
      console.log(respuesta);
      if (respuesta.status === 201 || respuesta.status === 200) {
        MySwal.fire({
          title: respuesta.data.msg,
          text: "Ya puedes iniciar sesión",
          icon: "success",
        });
        navigate("/login");
      } else {
        MySwal.fire({
          title: "Error",
          text: "No se pudo crear el usuario",
          icon: "error",
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Hubo un error al registrar el usuario, usuario ya existe con ese mail",
        icon: "error",
      });
    }
  };

  return (
    <div className="register-container container  my-3">
      <div className="row justify-content-center py-1">
        <div className="col-md-8 col-lg-6">
          <div className="login-container p-3">
            <div className="text-center mb-3">
              <h2 className="fw-bold mb-1">Registrate</h2>
            </div>

            <form onSubmit={handleSubmit(crearUsuario)}>
              <div className="mb-4 position-relative">
                <label className="form-label">Nombre y Apellido</label>
                <input
                  type="text"
                  className="form-control form-control-lg ps-4"
                  {...register("nombreUsuario", { required: true })}
                  placeholder="Juan Perez"
                />
                {errors.nombreUsuario && (
                  <p role="alert" className="text-danger">
                    El campo es obligatorio
                  </p>
                )}
              </div>

              <div className="mb-4 position-relative">
                <label className="form-label">Telefono</label>
                <input
                  type="number"
                  className="form-control form-control-lg ps-4"
                  {...register("telefonoUsuario", { required: true })}
                  placeholder="381•••••••"
                />
                {errors.telefonoUsuario && (
                  <p role="alert" className="text-danger">
                    El campo es obligatorio
                  </p>
                )}
              </div>

              <div className="mb-4 position-relative">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control form-control-lg ps-4"
                  {...register("emailUsuario", { required: true })}
                  placeholder="example@mail.com"
                />
                {errors.emailUsuario && (
                  <p role="alert" className="text-danger">
                    El campo es obligatorio
                  </p>
                )}
              </div>

              {/* Contraseña */}
              <div className="mb-4 position-relative">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg ps-4"
                  {...register("contraseniaUsuario", { required: true })}
                  placeholder="••••••••"
                />
                {errors.contraseniaUsuario && (
                  <p role="alert" className="text-danger">
                    El campo es obligatorio
                  </p>
                )}
              </div>

              {/* Repetir contraseña */}
              <div className="mb-4 position-relative">
                <label className="form-label">Repetir contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg ps-4"
                  {...register("rePassword", {
                    required: true,
                    validate: (value) => value === watch("contraseniaUsuario"),
                  })}
                  placeholder="••••••••"
                />
                {errors.rePassword && (
                  <p role="alert" className="text-danger">
                    Las contraseñas no son iguales
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="registro-btn btn btn-login btn-lg w-100 mb-3"
              >
                Registrarse
              </button>

              <div className="text-center mt-2">
                <span className="text-muted">¿Ya tienes cuenta? </span>
                <Link
                  to="/login"
                  className="text-decoration-none text-dark fw-bold"
                >
                  Inicia sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
