import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import clientAxios from "../helpers/clientAxios";

const RecoveryPassScreen = () => {
  const MySwal = withReactContent(Swal);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const mailRecovery = async () => {
  //   try {
  //     //   const respuesta = await axios.post("/usuarios");
  //     console.log(respuesta);
  //     if (respuesta.status === 201 || respuesta.status === 200) {
  //       MySwal.fire({
  //         title: "Registro exitoso",
  //         text: "Ya puedes iniciar sesión",
  //         icon: "success",
  //       });
  //       navigate("/login"); // me lleva al login despues de registrarme
  //     } else {
  //       MySwal.fire({
  //         title: "Error",
  //         text: "No se pudo crear el usuario",
  //         icon: "error",
  //       });
  //     }
  //   } catch (error) {
  //     MySwal.fire({
  //       title: "Error",
  //       text:
  //         error.response?.data?.message ||
  //         "Hubo un error al registrar el usuario",
  //       icon: "error",
  //     });
  //   }
  // };

  return (
    <div className="register-container container my-3">
      <div className="row justify-content-center py-3">
        <div className="col-md-8 col-lg-6">
          <div className="login-container p-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3">Recuperar Contraseña</h2>
            </div>

            <form onSubmit={handleSubmit()}>
              {/* Correo */}
              <div className="mb-4 position-relative">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control form-control-lg ps-4"
                  {...register("emailUsuario")}
                  placeholder="mail@mail.com"
                />

                <p className="text-danger"></p>
              </div>

              <button
                type="submit"
                className="registro-btn btn btn-custom btn-lg w-100 mb-3"
              >
                Recuperar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecoveryPassScreen;
