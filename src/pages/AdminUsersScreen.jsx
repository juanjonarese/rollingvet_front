import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import clientAxios from "../helpers/clientAxios";

const AdminUsersScreen = () => {
  const MySwal = withReactContent(Swal);
  const [usuarios, setUsuarios] = useState([]);
  const [rolesEditados, setRolesEditados] = useState({});

  const traerUsuarios = async () => {
    try {
      const respuesta = await clientAxios.get("/usuarios");
      const data = respuesta.data;
      setUsuarios(data.usuarios || []);
    } catch (error) {
      console.error("Error al traer usuarios", error);

      MySwal.fire({
        title: "Error",
        text: error.response?.data?.msg || "Ocurrió un error al traer usuarios",
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
      const respuesta = await clientAxios.put(`/usuarios/${idUsuario}/rol`, {
        rolUsuario: nuevoRol,
      });

      MySwal.fire({
        icon: "success",
        title: "Éxito",
        text: respuesta.data.msg || "Rol actualizado correctamente",
        timer: 2000,
        showConfirmButton: false,
      });

      traerUsuarios();
    } catch (error) {
      console.error("Error al actualizar rol", error);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.msg || "No se pudo actualizar el rol",
      });
    }
  };

  const deleteUser = async (usuario) => {
    const result = await MySwal.fire({
      title: `¿Quiere eliminar a: ${usuario.nombreUsuario}?`,
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: "No",
    });

    if (result.isConfirmed) {
      try {
        await clientAxios.delete(`/usuarios/${usuario._id}`);
        const newUsers = usuarios.filter((u) => u._id !== usuario._id);
        setUsuarios(newUsers);

        MySwal.fire("Usuario eliminado", "", "success");
      } catch (error) {
        MySwal.fire("Error", "No se pudo eliminar el usuario", "error");
        console.error(error.response?.data || error.message);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Usuarios</h2>

      {usuarios.map((usuario) => (
        <div key={usuario._id} className="card mb-3">
          <div className="card-body">
            <div className="row">
              
              {/* Información del usuario */}
              <div className="col-12 col-md-8">
                <div className="row">
                  <div className="col-12 col-sm-6 mb-2">
                    <strong>Nombre:</strong> {usuario.nombreUsuario}
                  </div>
                  <div className="col-12 col-sm-6 mb-2">
                    <strong>Teléfono:</strong> {usuario.telefonoUsuario}
                  </div>
                  <div className="col-12 mb-2">
                    <strong>Email:</strong> <span className="text-break">{usuario.emailUsuario}</span>
                  </div>
                  <div className="col-12 mb-2">
                    <strong>Rol:</strong> {usuario.rolUsuario}
                  </div>
                </div>
              </div>
              
              {/* Controles */}
              <div className="col-12 col-md-4">
                <select
                  className="form-select form-select-sm mb-2"
                  value={rolesEditados[usuario._id] || usuario.rolUsuario}
                  onChange={(e) => handleRolChange(usuario._id, e.target.value)}
                >
                  <option value="cliente">User</option>
                  <option value="veterinario">Veterinario</option>
                  <option value="admin">Admin</option>
                </select>

                <div className="d-flex gap-2">
                  <button
                    onClick={() => actualizarRol(usuario._id)}
                    className="btn btn-primary btn-sm flex-fill"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => deleteUser(usuario)}
                    className="btn btn-danger btn-sm flex-fill"
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminUsersScreen;