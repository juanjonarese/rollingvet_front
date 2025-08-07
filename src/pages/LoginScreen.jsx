import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import clientAxios from "../helpers/clientAxios";

const LoginScreen = (props) => {
  const { handleClose } = props;
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const logIn = async (datos) => {
    try {
      console.log("Datos enviados:", datos);

      // envio los datos del formulario
      const respuesta = await clientAxios.post("/usuarios/login", datos);

      console.log("Respuesta del backend:", respuesta.data);

      const { rolUsuario, token } = respuesta.data;

      // valido si hay token
      if (token) {
        // guardo usuario en localStorage
        localStorage.setItem("user", JSON.stringify({ rolUsuario, token }));

        // cierro modal y voy al home
        // ✅ Solo cerrar modal si existe handleClose
        if (typeof handleClose === "function") {
          handleClose();
        }
        navigate("/");
      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error.response.data.msg || "Ocurrió un error al iniciar sesión",
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center my-4">
        <div className="col-md-8 col-lg-8">
          <div className="login-container">
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3">¡Bienvenido!</h2>
              <p className="text-muted">Iniciá sesión para continuar</p>
            </div>

            <form onSubmit={handleSubmit(logIn)}>
              <div className="mb-4 position-relative">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control form-control-lg ps-4"
                  {...register("emailUsuario", { required: true })}
                  placeholder="mail@mail.com"
                />
                {errors.emailUsuario && (
                  <p role="alert" className="text-danger">
                    El campo es obligatorio
                  </p>
                )}
              </div>

              <div className="mb-4 position-relative">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control form-control-lg ps-4"
                  {...register("contraseniaUsuario", { required: true })}
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
                className="btn btn-lg w-100 my-3 text-white btn-login"
                id="boton-login"
              >
                Iniciar sesión
              </button>

              <div className="text-center mt-4">
                <span className="text-muted">¿No tenés cuenta? </span>
                <span
                  onClick={() => {
                    handleClose();
                    navigate("/signup");
                  }}
                  className="text-decoration-none fw-bold enlace"
                  style={{ cursor: "pointer" }}
                >
                  Registrate
                </span>
              </div>
              <div className="text-center mt-4">
                <span className="text-muted">¿olvidaste tu contraseña? </span>
                <span
                  onClick={() => {
                    handleClose();
                    navigate("/recoverymail");
                  }}
                  className="text-decoration-none fw-bold enlace"
                  style={{ cursor: "pointer" }}
                >
                  Recuperar
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
