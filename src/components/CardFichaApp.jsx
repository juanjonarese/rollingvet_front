import { useEffect, useState } from "react";

const CardProductApp = () => {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [mascota, setMascota] = useState("")
  const [especie, setEspecie] = useState("")
  const [raza, setRaza] = useState("")
  const [edad, setEdad] = useState("")
  const [motivo, setMotivo] = useState("")
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [vet, setVet] = useState("")
  const [detalle, setDetalle] = useState("")

return (
    <div className="col-md-6 my-4">
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">Ficha de Consulta</h5>
          <p className="mb-1"><strong>Nombre y Apellido:</strong> {nombre} {apellido}</p>
          <p className="mb-1"><strong>Teléfono:</strong> {telefono}</p>
          <p className="mb-1"><strong>Email:</strong> {email}</p>

      <hr />

      <p className="mb-1"><strong>Nombre de la Mascota:</strong> {mascota}</p>
      <p className="mb-1"><strong>Especie:</strong> {especie}</p>
      <p className="mb-1"><strong>Raza:</strong> {raza}</p>
      <p className="mb-1"><strong>Edad:</strong> {edad} años</p>

      <hr />

      <p className="mb-1"><strong>Motivo de Consulta:</strong> {motivo}</p>
      <p className="mb-1"><strong>Fecha:</strong> {fecha}</p>
      <p className="mb-3"><strong>Hora:</strong> {hora}</p>

      <p className="mb-1"><strong>Veterinario:</strong> {vet}</p>
      
      <p className="mt-3"><strong>Detalles de la consulta:</strong> {detalle}</p>
        {/* <label className="form-label fw-bold">Detalles de la Consulta:</label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Escribe aquí los detalles clínicos o indicaciones..."
        ></textarea> */}
    </div>
  </div>
</div>

  );
};

export default CardProductApp;
