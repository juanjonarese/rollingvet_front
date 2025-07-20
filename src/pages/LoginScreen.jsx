import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import { loginUsuario } from "../helpers/ApiUsers";
import "../css/login.css";

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
      const respuesta = await loginUsuario(datos);
      console.log(respuesta);
      if (respuesta.token) {
        // const { username, email, rol } = data.usuario;
        localStorage.setItem("user", JSON.stringify(respuesta.token));
        navigate("/");
      } else {
        MySwal.fire({
          title: "OOPS!",
          text: data.message || "Correo o contraseña incorrectos",
          icon: "error",
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: "No se pudo conectar con el servidor",
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
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
                className="btn btn-lg w-100 my-3 text-white"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
