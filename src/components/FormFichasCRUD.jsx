import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const FormFichasCRUD = ({ addFicha }) => {
  const MySwal = withReactContent(Swal);

  const { register, handleSubmit, reset, setFocus } = useForm();

  const veterinarios = [
    { id: "vet1", nombre: "Dr. María González" },
    { id: "vet2", nombre: "Dr. Carlos Rodríguez" },
  ];

  const especies = [
    { value: "perro", label: "Perro" },
    { value: "gato", label: "Gato" },
    { value: "ave", label: "Ave" },
    { value: "otros", label: "Otros" },
  ];

  const horariosDisponibles = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
  ];
  

  const submitFicha = (datos) => {
    addFicha(datos);
    reset();
    setFocus("titulo");
    MySwal.fire({
      title: "La ficha se guardó con éxito!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div className="d-flex ">
      <div className="container justify-content-center">
        <div className="row my-4 ">
          <form onSubmit={handleSubmit(submitFicha)}>
            <div className="row">
            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Nombre</label>
              <input
                type="text"
                className="form-control form-control-lg"
                {...register("nombre", { required: true })}
                placeholder="Nombre del usuario"
              />
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Apellido</label>
              <input
                type="text"
                className="form-control form-control-lg"
                {...register("apellido", { required: true })}
                placeholder="Apellido del usuario"
              />
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Teléfono</label>
              <input
                type="text"
                className="form-control form-control-lg"
                {...register("telefono", { required: true })}
                placeholder="Numero telefonico"
              />
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">E-Mail</label>
              <input
                type="email"
                className="form-control form-control-lg"
                {...register("email", { required: true })}
                placeholder="Correo electronico"
              />
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Nombre de la mascota</label>
              <input
                type="text"
                className="form-control form-control-lg"
                {...register("nombreMascota", { required: true })}
                placeholder="Nombre de la mascota"
              />
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Especie</label>
              <input
                type="text"
                className="form-control form-control-lg"
                {...register("especieMascota", { required: true })}
                placeholder="Especie de la mascota"
              />
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Raza</label>
              <input
                type="text"
                className="form-control form-control-lg"
                {...register("razaMascota")}
                placeholder="Raza de la mascota"
              />
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Edad</label>
              <input
                type="text"
                className="form-control form-control-lg"
                {...register("edadMascota")}
                placeholder="Edad de la mascota"
              />
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Motivo de la consulta</label>
              <input
                type="text"
                className="form-control form-control-lg"
                {...register("motivoConsulta", { required: true })}
                placeholder="Detalle las razones de la consulta"
              />
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Fecha</label>
              <input
                type="date"
                className="form-control form-control-lg"
                {...register("fecha", { required: true })}
              />
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Hora</label>
              <input
                type="time"
                className="form-control form-control-lg"
                {...register("hora", { required: true })}
              />
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Veterinario</label>
              <select
                className="form-select form-select-sm mb-2"
                {...register("veterinario", { required: true })}
                // value={veterinario}
                // onChange={(e) => setVeterinario(e.target.value)}
              >
                <option value="vet1">Veterinario 1</option>
                <option value="vet2">Veterinario 2</option>
              </select>
            </div>

            <div className="mb-4 col-md-6">
              <label className="form-label fw-bold">Detalles de la consulta</label>
              <textarea
                className="form-control"
                {...register("descripcion")}
                rows="4"
                placeholder="Describe detalladamente lo tratado en la consulta"
              ></textarea>
            </div>
          </div>
            <div className="d-grid col-md-6">
              <button type="submit" className="btn btn-lg btn-login">
                <i className="bi bi-save me-2  "></i>Guardar Ficha
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default FormFichasCRUD;
