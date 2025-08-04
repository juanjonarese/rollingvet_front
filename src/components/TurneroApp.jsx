import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import clientAxios from "../helpers/clientAxios";

("use client");

import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Alert,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const veterinarios = [
  { id: "vet1", nombre: "Dr. María González" },
  { id: "vet2", nombre: "Dr. Carlos Rodríguez" },
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

export default function TuerneroApp() {
  const MySwal = withReactContent(Swal);
  const [turnos, setTurnos] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState({
    detalle: "",
    veterinario: "",
    mascota: "",
    fecha: "",
    hora: "",
  });
  const [errores, setErrores] = useState({});
  const [mostrarExito, setMostrarExito] = useState(false);
  try {
    const respuesta = clientAxios.post("/usuarios", datos);

    if (respuesta.status === 201 || respuesta.status === 200) {
      MySwal.fire({
        title: "Registro exitoso",
        text: "Ya puedes iniciar sesión",
        icon: "success",
      });
      navigate("/login");
    } else {
      MySwal.fire({
        title: "Error",
        text: "No se pudo crear el usuario",
        icon: "error",
      });
    }
  } catch (error) {
    MySwal.fire({
      title: "Error",
      text:
        error.response?.data?.message ||
        "Hubo un error al registrar el usuario",
      icon: "error",
    });
  }
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setDatosFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!datosFormulario.detalle.trim()) {
      nuevosErrores.detalle = "El detalle de la cita es obligatorio";
    }

    if (!datosFormulario.veterinario) {
      nuevosErrores.veterinario = "Debe seleccionar un veterinario";
    }

    if (!datosFormulario.mascota.trim()) {
      nuevosErrores.mascota = "El nombre de la mascota es obligatorio";
    }

    if (!datosFormulario.fecha) {
      nuevosErrores.fecha = "La fecha es obligatoria";
    } else {
      const fechaSeleccionada = new Date(datosFormulario.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      if (fechaSeleccionada < hoy) {
        nuevosErrores.fecha = "No se pueden agendar citas en fechas pasadas";
      }

      const diaSemana = fechaSeleccionada.getDay();
      if (diaSemana === 0 || diaSemana === 6) {
        nuevosErrores.fecha = "Solo se pueden agendar citas de lunes a viernes";
      }
    }

    if (!datosFormulario.hora) {
      nuevosErrores.hora = "Debe seleccionar una hora";
    }

    if (
      datosFormulario.fecha &&
      datosFormulario.hora &&
      datosFormulario.veterinario
    ) {
      const horarioOcupado = turnos.some(
        (turno) =>
          turno.fecha === datosFormulario.fecha &&
          turno.hora === datosFormulario.hora &&
          turno.veterinario === datosFormulario.veterinario
      );

      if (horarioOcupado) {
        nuevosErrores.hora =
          "Este horario ya está ocupado para el veterinario seleccionado";
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      const nuevoTurno = {
        id: Date.now().toString(),
        ...datosFormulario,
        fechaCreacion: new Date(),
      };

      setTurnos((prev) => [...prev, nuevoTurno]);
      setDatosFormulario({
        detalle: "",
        veterinario: "",
        mascota: "",
        fecha: "",
        hora: "",
      });
      setMostrarExito(true);
      setTimeout(() => setMostrarExito(false), 3000);
    }
  };

  const eliminarTurno = (id) => {
    setTurnos((prev) => prev.filter((turno) => turno.id !== id));
  };

  const obtenerNombreVeterinario = (idVet) => {
    return veterinarios.find((vet) => vet.id === idVet)?.nombre || idVet;
  };

  const turnosOrdenados = [...turnos].sort((a, b) => {
    const fechaA = new Date(`${a.fecha} ${a.hora}`);
    const fechaB = new Date(`${b.fecha} ${b.hora}`);
    return fechaA.getTime() - fechaB.getTime();
  });

  const obtenerFechaMinima = () => {
    const hoy = new Date();
    return hoy.toISOString().split("T")[0];
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4 text-primary">
            🐾 Sistema de Turnos Veterinaria
          </h1>
        </Col>
      </Row>

      {mostrarExito && (
        <Row className="mb-4">
          <Col>
            <Alert
              variant="success"
              dismissible
              onClose={() => setMostrarExito(false)}
            >
              ✅ Turno agendado exitosamente
            </Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col lg={5} className="mb-4">
          <Card>
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">📅 Agendar Nuevo Turno</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={manejarEnvio}>
                <Form.Group className="mb-3">
                  <Form.Label>Detalle de la Cita *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="detalle"
                    value={datosFormulario.detalle}
                    onChange={manejarCambioInput}
                    placeholder="Ej: Consulta general, vacunación, control..."
                    isInvalid={!!errores.detalle}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.detalle}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Veterinario *</Form.Label>
                  <Form.Select
                    name="veterinario"
                    value={datosFormulario.veterinario}
                    onChange={manejarCambioInput}
                    isInvalid={!!errores.veterinario}
                  >
                    <option value="">Seleccionar veterinario...</option>
                    {veterinarios.map((vet) => (
                      <option key={vet.id} value={vet.id}>
                        {vet.nombre}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errores.veterinario}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mascota *</Form.Label>
                  <Form.Control
                    type="text"
                    name="mascota"
                    value={datosFormulario.mascota}
                    onChange={manejarCambioInput}
                    placeholder="Nombre de la mascota"
                    isInvalid={!!errores.mascota}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.mascota}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Fecha *</Form.Label>
                      <Form.Control
                        type="date"
                        name="fecha"
                        value={datosFormulario.fecha}
                        onChange={manejarCambioInput}
                        min={obtenerFechaMinima()}
                        isInvalid={!!errores.fecha}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.fecha}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Solo lunes a viernes
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Hora *</Form.Label>
                      <Form.Select
                        name="hora"
                        value={datosFormulario.hora}
                        onChange={manejarCambioInput}
                        isInvalid={!!errores.hora}
                      >
                        <option value="">Seleccionar hora...</option>
                        {horariosDisponibles.map((hora) => (
                          <option key={hora} value={hora}>
                            {hora}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errores.hora}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Horario: 8:00 - 16:00
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    📝 Agendar Turno
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/*  <Col lg={7}>
          <Card>
            <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">📋 Turnos Agendados</h4>
              <Badge bg="light" text="dark">
                {turnos.length} turno{turnos.length !== 1 ? "s" : ""}
              </Badge>
            </Card.Header>
            <Card.Body>
              {turnos.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <h5>No hay turnos agendados</h5>
                  <p>Agenda el primer turno usando el formulario</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead className="table-dark">
                      <tr>
                        <th>Fecha/Hora</th>
                        <th>Veterinario</th>
                        <th>Mascota</th>
                        <th>Detalle</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {turnosOrdenados.map((turno) => (
                        <tr key={turno.id}>
                          <td>
                            <div>
                              <strong>
                                {new Date(turno.fecha).toLocaleDateString(
                                  "es-ES",
                                  {
                                    weekday: "short",
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                  }
                                )}
                              </strong>
                            </div>
                            <small className="text-muted">{turno.hora}</small>
                          </td>
                          <td>
                            <Badge bg="info">
                              {obtenerNombreVeterinario(turno.veterinario)}
                            </Badge>
                          </td>
                          <td>
                            <strong>{turno.mascota}</strong>
                          </td>
                          <td>
                            <small>{turno.detalle}</small>
                          </td>
                          <td>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => eliminarTurno(turno.id)}
                              title="Eliminar turno"
                            >
                              🗑️
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col> */}
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="bg-light">
            <Card.Body>
              <h6 className="text-muted mb-2">ℹ️ Información importante:</h6>
              <ul className="mb-0 text-muted small">
                <li>Los turnos solo se pueden agendar de lunes a viernes</li>
                <li>Horario de atención: 8:00 AM - 4:00 PM</li>
                <li>Turnos cada 30 minutos</li>
                <li>No se pueden agendar turnos en fechas pasadas</li>
                <li>Cada veterinario puede atender un paciente por horario</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
