import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginScreen = (props) => {
  //   localStorage.setItem("usuarios", JSON.stringify(datosUsuarios));
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();

  const logIn = (datos) => {
    const user = datosUsuarios.find(
      (usuario) =>
        usuario.email === datos.email && usuario.password === datos.password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      reset();
      setFocus("email");
      handleClose();
    } else {
      reset();
      setFocus("email");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-8">
          <div className="login-container">
            <div className="text-center mb-3">
              <h2 className="fw-bold mb-1">¡Bienvenido!</h2>
              <p className="text-muted">Iniciá sesión para continuar</p>
            </div>

            <form onSubmit={handleSubmit(logIn)}>
              <div className="mb-4 position-relative">
                <label for="email" className="form-label">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg ps-4"
                  {...register("email")}
                  placeholder="nombre@ejemplo.com"
                />
                {errors.email && (
                  <span role="alert" className="text-danger">
                    El campo no debe estar vacío
                  </span>
                )}
              </div>

              <div className="mb-4 position-relative">
                <label for="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control form-control-lg ps-4"
                  {...register("password")}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <span role="alert" className="text-danger">
                    El campo no debe estar vacío
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-lg w-100 my-3 text-white bg-primary"
                id="boton-login"
              >
                Iniciar sesión
              </button>

              <div className="text-center mt-4">
                <span className="text-muted">¿No tenés cuenta? </span>
                <Link className="text-decoration-none fw-bold enlace" to="*">
                  Registrate
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
