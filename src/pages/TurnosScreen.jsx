import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import clientAxios from "../helpers/clientAxios";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
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

export default function TurnosScreen() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [veterinarios, setVeterinarios] = useState([]);

useEffect(() => {
    const traerVeterinarios = async () => {
      try {
        const { data } = await clientAxios.get("/usuarios");
        const vets = data.usuarios.filter((u) => u.rolUsuario === "veterinario");
        setVeterinarios(vets);
      } catch (error) {
        console.error("Error al cargar veterinarios", error);
      }
    };

    traerVeterinarios();
  }, []);
  
  const [turnos, setTurnos] = useState([]);
  const [datosFormulario, setDatosFormulario] = useState({
    detalle: "",
    veterinario: "",
    mascota: "",
    especie: "",
    fecha: "",
    hora: "",
  });
  const [errores, setErrores] = useState({});
  const [mostrarExito, setMostrarExito] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [cargandoTurnos, setCargandoTurnos] = useState(false);

  // Cargar turnos existentes al montar el componente
  useEffect(() => {
    cargarTurnos();
  }, []);

  const cargarTurnos = async () => {
  try {
    setCargandoTurnos(true);
    const respuesta = await clientAxios.get("/turnos");
    setTurnos(respuesta.data);
  } catch (error) {
    console.error("Error al cargar turnos:", error);
    MySwal.fire({
      title: "Error",
      text: "No se pudieron cargar los turnos existentes",
      icon: "warning",
    });
  } finally {
    setCargandoTurnos(false);
  }
};

const crearTurno = async (datos) => {
  try {
    const datosParaEnviar = {
      nombreMascota: datos.nombre,   // ⚡ mapear "nombre" a "nombreMascota"
      especie: datos.especie,
      detalleCita: datos.detalleCita,
      fecha: datos.fecha,
      hora: datos.hora,
      veterinarioConsulta: datos.veterinario,
      // veterinario y especie NO van porque tu schema no los acepta
    };

    console.log("Voy a enviar:", datosParaEnviar);

    const respuesta = await clientAxios.post("/turnos", datosParaEnviar);

    console.log("Llegó la respuesta:", respuesta);
    
    if (respuesta.status === 201) {
      const turnoCreado = respuesta.data;

      const datosFicha = {
        nombreUsuario: "Anónimo",
        telefonoUsuario: "0000000000",
        emailUsuario: "anonimo@example.com",

        nombreMascota: datos.nombre,
        especieMascota: datos.especie,
        motivoConsulta: datos.detalleCita,
        fechaConsulta: datos.fecha,
        horaConsulta: datos.hora,
        veterinarioConsulta: datos.veterinario,
      };

      await clientAxios.post("/fichas", datosFicha);

      MySwal.fire(
        "Turno creado",
        "El turno fue registrado con éxito",
        "success"
      );
    }

    // ✅ Esto tiene que estar DENTRO del try, no afuera de la función
    // Reiniciar formulario
    setDatosFormulario({
      detalle: "",
      veterinario: "",
      mascota: "",
      especie: "",
      fecha: "",
      hora: "",
    });

    setMostrarExito(true);
    setTimeout(() => setMostrarExito(false), 3000);

    // Recargar la lista de turnos
    await cargarTurnos();

  } catch (error) {
    console.error("Error creando turno:", error);
    MySwal.fire("Error", "No se pudo registrar el turno", "error");
  }
};


  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setDatosFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar errores cuando el usuario corrige
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

    if (!datosFormulario.especie) {
      nuevosErrores.especie = "Debe seleccionar la especie";
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

    // Verificar disponibilidad del horario
    if (
      datosFormulario.fecha &&
      datosFormulario.hora &&
      datosFormulario.veterinario
    ) {
      const fechaSeleccionada = datosFormulario.fecha; // formato: "2025-08-20"
      
      const horarioOcupado = turnos.some((turno) => {
        if (!turno.fecha) return false;
        
        let fechaTurno;
        try {
          // Convertir la fecha del turno al formato YYYY-MM-DD para comparar
          const fechaObj = new Date(turno.fecha);
          if (isNaN(fechaObj.getTime())) return false; // Fecha inválida
          
          fechaTurno = fechaObj.toISOString().split('T')[0];
        } catch (error) {
          console.warn("Error al procesar fecha del turno:", turno.fecha);
          return false;
        }
        
        return (
          fechaTurno === fechaSeleccionada &&
          turno.hora === datosFormulario.hora &&
          ((turno.veterinarioConsulta &&
     turno.veterinarioConsulta._id === datosFormulario.veterinario) ||
    !turno.veterinarioConsulta)
        );
      });

      if (horarioOcupado) {
        nuevosErrores.hora =
          "Este horario ya está ocupado para el veterinario seleccionado";
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      // Preparar los datos según la estructura que espera tu backend
      const datosParaEnviar = {
        nombre: datosFormulario.mascota,                    // mascota -> nombre
        especie: datosFormulario.especie,                   // especie
        detalleCita: datosFormulario.detalle,              // detalle -> detalleCita
        fecha: datosFormulario.fecha + "T00:00:00.000Z",   // fecha en formato ISO
        hora: datosFormulario.hora,                        // hora
        veterinario: datosFormulario.veterinario,          // veterinario (si tu backend lo acepta)
      };

      console.log("Datos preparados para enviar:", datosParaEnviar);
      await crearTurno(datosParaEnviar);
    }
  };

  const obtenerNombreEspecie = (especieValue) => {
    return especies.find((esp) => esp.value === especieValue)?.label || especieValue;
  };

  const obtenerFechaMinima = () => {
    const hoy = new Date();
    return hoy.toISOString().split("T")[0];
  };

  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return "";
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString("es-ES");
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4 text-primary">
            Sistema de Turnos Veterinaria
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
        <Col lg={6} className="mb-4">
          <Card>
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Agendar Nuevo Turno</h4>
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
                    placeholder="Ej: Consulta general, vacunación, control, revisión..."
                    isInvalid={!!errores.detalle}
                    disabled={enviando}
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
                    disabled={enviando}
                  >
                    <option value="">Seleccionar veterinario...</option>
                    {veterinarios.map((vet) => (
                      <option key={vet._id} value={vet._id}>
                        {vet.nombreUsuario}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errores.veterinario}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre de la Mascota *</Form.Label>
                      <Form.Control
                        type="text"
                        name="mascota"
                        value={datosFormulario.mascota}
                        onChange={manejarCambioInput}
                        placeholder="Nombre de la mascota"
                        isInvalid={!!errores.mascota}
                        disabled={enviando}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errores.mascota}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Especie *</Form.Label>
                      <Form.Select
                        name="especie"
                        value={datosFormulario.especie}
                        onChange={manejarCambioInput}
                        isInvalid={!!errores.especie}
                        disabled={enviando}
                      >
                        <option value="">Seleccionar especie...</option>
                        {especies.map((especie) => (
                          <option key={especie.value} value={especie.value}>
                            {especie.label}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errores.especie}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

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
                        disabled={enviando}
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
                        disabled={enviando}
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
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={enviando}
                  >
                    {enviando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Agendando...
                      </>
                    ) : (
                      "Agendar Turno"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card>
            <Card.Header className="bg-secondary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Turnos Programados</h4>
              <Button 
                variant="outline-light" 
                size="sm" 
                onClick={cargarTurnos}
                disabled={cargandoTurnos}
              >
                {cargandoTurnos ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  "🔄"
                )}
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              {cargandoTurnos ? (
                <div className="text-center p-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              ) : turnos.length > 0 ? (
                <div className="table-responsive">
                  <Table striped hover className="mb-0">
                    <thead>
                      <tr>
                        <th>Mascota</th>
                        <th>Especie</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Veterinario</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {turnos.slice(-10).reverse().map((turno, index) => (
                        <tr key={turno._id || index}>
                          <td>
                            <strong>{turno.nombreMascota}</strong>
                            <br />
                            <small className="text-muted">
                              {turno.detalleCita?.substring(0, 30)}
                              {turno.detalleCita?.length > 30 ? "..." : ""}
                            </small>
                          </td>
                          <td>
                            <Badge bg="info">
                              {obtenerNombreEspecie(turno.especie)}
                            </Badge>
                          </td>
                          <td>{formatearFecha(turno.fecha)}</td>
                          <td>
                            <Badge bg="primary">{turno.hora}</Badge>
                          </td>
                          <td>
                            {turno.veterinarioConsulta 
                            ? `${turno.veterinarioConsulta.nombreUsuario}`
                            : "Sin asignar"}
                          </td>
                          <td>
                            <Badge bg="success">Agendado</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center p-4 text-muted">
                  <h5>No hay turnos programados</h5>
                  <p>Los turnos que agregues aparecerán aquí</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="bg-light">
            <Card.Body>
              <h6 className="text-muted mb-2">
                ℹ️ Información importante:
              </h6>
              <ul className="mb-0 text-muted small">
                <li>Los turnos solo se pueden agendar de lunes a viernes</li>
                <li>Horario de atención: 8:00 AM - 4:00 PM</li>
                <li>Turnos cada 30 minutos</li>
                <li>No se pueden agendar turnos en fechas pasadas</li>
                <li>Cada veterinario puede atender un paciente por horario</li>
                <li>Es obligatorio especificar la especie del animal</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}