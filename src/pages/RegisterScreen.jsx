import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { registrarUsuario } from "../helpers/ApiUsers";
import "../css/register.css";

const RegisterScreen = () => {
  const MySwal = withReactContent(Swal);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const registrarse = async (datos) => {
    try {
      const respuesta = await registrarUsuario(datos);
      if (respuesta.status === 201)
        MySwal.fire({
          title: "Usuario creado",
          text: data.message || "Correo o contraseña",
          icon: "error",
        });
      navigate();
    } catch (error) {}

    // Acá iría la lógica para registrar el usuario, por ahora solo muestra un mensaje
    MySwal.fire({
      title: "Registro exitoso",
      text: "Ya puedes iniciar sesión",
      icon: "success",
    });
    console.log("Datos del formulario:", datos);
  };

  return (
    <div className="register-container container my-3">
      <div className="row justify-content-center py-3">
        <div className="col-md-8 col-lg-6">
          <div className="login-container p-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3">Registrate</h2>
            </div>

            <form onSubmit={handleSubmit(registrarse)}>
              {/* Correo */}
              <div className="mb-4 position-relative">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control form-control-lg ps-4"
                  {...register("emailUsuario")}
                  placeholder="mail@mail.com"
                />
                {errors.correo && (
                  <p className="text-danger">{errors.correo.message}</p>
                )}
              </div>

              {/* Contraseña */}
              <div className="mb-4 position-relative">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg ps-4"
                  {...register("contraseniaUsuario")}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>

              {/* Repetir contraseña */}
              <div className="mb-4 position-relative">
                <label className="form-label">Repetir contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg ps-4"
                  {...register("rePassword", {
                    required: "Este campo es obligatorio",
                    validate: (value) =>
                      value === watch("password") ||
                      "Las contraseñas no coinciden",
                  })}
                  placeholder="••••••••"
                />
                {errors.rePassword && (
                  <p className="text-danger">{errors.rePassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="registro-btn btn btn-custom btn-lg w-100 mb-3"
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
