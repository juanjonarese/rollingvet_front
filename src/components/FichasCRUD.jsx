import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import clientAxios from "../helpers/clientAxios";

const CrudFichas = () => {
  const MySwal = withReactContent(Swal);
  const [fichas, setFichas] = useState([]);
  const [editando, setEditando] = useState(null);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();


  const traerFichas = async () => {
    try {
      const respuesta = await clientAxios.get("/fichas");
      const data = respuesta.data;
      setFichas(data.fichas || []);
    } catch (error) {
      console.error("No fue posible cargar las fichas", error);
    }
  };


  const onSubmit = async (data) => {
    try {
      if (editando) {
        await clientAxios.put(`/fichas/${editando}`, data);
        MySwal.fire("Ficha actualizada", "La ficha fue modificada correctamente", "success");
      } else {
        await clientAxios.post("/fichas", data);
        MySwal.fire("Ficha creada", "La ficha fue registrada correctamente", "success");
      }
      reset();
      setEditando(null);
      traerFichas();
    } catch (error) {
      MySwal.fire("Error", error.response?.data?.msg || "No se pudo guardar la ficha", "error");
    }
  };


  const eliminarFicha = async (id) => {
    MySwal.fire({
      title: "¿Eliminar ficha?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await clientAxios.delete(`/fichas/${id}`);
          MySwal.fire("Eliminada", "La ficha fue eliminada", "success");
          traerFichas();
        } catch (error) {
          MySwal.fire("Error", "No se pudo eliminar la ficha", "error");
        }
      }
    });
  };


  const cargarEdicion = (ficha) => {
    setEditando(ficha._id);
    for (let campo in ficha) {
      if (campo in ficha) {
        setValue(campo, ficha[campo]);
      }
    }
  };

  useEffect(() => {
    traerFichas();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">{editando ? "Editar ficha" : "Crear ficha"}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6 mb-2">
            <label>Nombre</label>
            <input className="form-control" {...register("nombre", { required: true })} />
            {errors.nombre && <p className="text-danger">Obligatorio</p>}
          </div>
          <div className="col-md-6 mb-2">
            <label>Apellido</label>
            <input className="form-control" {...register("apellido", { required: true })} />
            {errors.apellido && <p className="text-danger">Obligatorio</p>}
          </div>
          <div className="col-md-6 mb-2">
            <label>Teléfono</label>
            <input className="form-control" {...register("telefono", { required: true })} />
          </div>
          <div className="col-md-6 mb-2">
            <label>Email</label>
            <input className="form-control" {...register("email", { required: true })} />
          </div>
          <div className="col-md-6 mb-2">
            <label>Mascota</label>
            <input className="form-control" {...register("mascota", { required: true })} />
          </div>
          <div className="col-md-6 mb-2">
            <label>Especie</label>
            <input className="form-control" {...register("especie", { required: true })} />
          </div>
          <div className="col-md-6 mb-2">
            <label>Raza</label>
            <input className="form-control" {...register("raza")} />
          </div>
          <div className="col-md-6 mb-2">
            <label>Edad</label>
            <input type="number" className="form-control" {...register("edad")} />
          </div>
          <div className="col-md-12 mb-2">
            <label>Motivo</label>
            <textarea className="form-control" {...register("motivo", { required: true })}></textarea>
          </div>
          <div className="col-md-6 mb-2">
            <label>Fecha</label>
            <input type="date" className="form-control" {...register("fecha", { required: true })} />
          </div>
          <div className="col-md-6 mb-2">
            <label>Hora</label>
            <input type="time" className="form-control" {...register("hora", { required: true })} />
          </div>
          <div className="col-md-6 mb-2">
            <label>Veterinario</label>
            <input className="form-control" {...register("vet", { required: true })} />
          </div>
          <div className="col-md-12 mb-3">
            <label>Detalles</label>
            <textarea className="form-control" {...register("detalle")}></textarea>
          </div>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {editando ? "Actualizar" : "Guardar"}
        </button>
        {editando && (
          <button type="button" className="btn btn-secondary" onClick={() => { reset(); setEditando(null); }}>
            Cancelar
          </button>
        )}
      </form>

      <hr />
      <h3>Lista de fichas</h3>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Mascota</th>
            <th>Fecha</th>
            <th>Veterinario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fichas.length > 0 ? (
            fichas.map((f) => (
              <tr key={f._id}>
                <td>{f.nombre} {f.apellido}</td>
                <td>{f.mascota}</td>
                <td>{f.fecha}</td>
                <td>{f.vet}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => cargarEdicion(f)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarFicha(f._id)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5" className="text-center">No hay fichas</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudFichas;
