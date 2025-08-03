import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "../helpers/clientAxios";

const AdminUsersScreen = () => {
  const MySwal = withReactContent(Swal);
  const [usuarios, setUsuarios] = useState([]);
  const [rolesEditados, setRolesEditados] = useState({}); // Guarda los roles cambiados por ID

  const traerUsuarios = async () => {
    try {
      const respuesta = await axios.get("/usuarios");
      const data = respuesta.data;
      setUsuarios(data.usuarios || []);
    } catch (error) {
      console.error("Error al traer usuarios", error);

      MySwal.fire({
        title: "Error",
        text: error.response.data.msg || "Ocurrió un error al iniciar sesión",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    traerUsuarios();
  }, []);

  const handleRolChange = (idUsuario, nuevoRol) => {
    setRolesEditados({
      ...rolesEditados,
      [idUsuario]: nuevoRol,
    });
  };

  const actualizarRol = async (idUsuario) => {
    const nuevoRol = rolesEditados[idUsuario];
    if (!nuevoRol) return;

    try {
      const respuesta = await axios.put(`/usuarios/${idUsuario}/rol`, {
        rolUsuario: nuevoRol,
      });

      MySwal.fire({
        icon: "success",
        title: "Éxito",
        text: respuesta.data.msg || "Rol actualizado correctamente",
        timer: 2000,
        showConfirmButton: false,
      });

      traerUsuarios(); // refresca lista
    } catch (error) {
      console.error("Error al actualizar rol", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.msg || "No se pudo actualizar el rol",
      });
    }
  };

  return (
    <div className="container">
      <h2>Usuarios</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.nombreUsuario}</td>
              <td>{usuario.telefonoUsuario}</td>
              <td>{usuario.emailUsuario}</td>
              <td>
                <div className="mb-2">
                  <select
                    className="form-select form-select-sm"
                    value={rolesEditados[usuario._id] || usuario.rolUsuario}
                    onChange={(e) =>
                      handleRolChange(usuario._id, e.target.value)
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="veterinario">Veterinario</option>
                    <option value="cliente">User</option>
                  </select>
                </div>
              </td>
              <td>
                <button
                  onClick={() => actualizarRol(usuario._id)}
                  className="btn btn-primary"
                >
                  Cambiar Rol
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersScreen;
