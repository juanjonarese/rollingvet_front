import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Offcanvas,
  ListGroup,
  Stack,
} from "react-bootstrap";
// import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

// 🔑 Reemplaza con tu Public Key de MercadoPago
// initMercadoPago("TU_PUBLIC_KEY_AQUI");

const productosMock = [
  { id: 1, title: "Alimento Balanceado Perro", price: 3500, img: "../public/AlimentoBalanceado.png" },
  { id: 2, title: "Alimento Gato Premium", price: 2800, img: "../public/AlimentoParaGatosPremium.png" },
  { id: 3, title: "Rascador para Gato", price: 4200, img: "../public/RascadorParaGatos.png" },
  { id: 4, title: "Juguete Mordedor", price: 1500, img: "../public/mordedorparaperros.png" },
  { id: 5, title: "Cama para Perro", price: 5200, img: "../public/camaparaperros.png" },
  { id: 6, title: "Collar con Placa", price: 800, img: "../public/collarconplaca.jpg" }
];

const ProductosPage = () => {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  const [preferenceId, setPreferenceId] = useState(null);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const crearPreferencia = async () => {
    try {
      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Authorization": "Bearer TU_ACCESS_TOKEN_AQUI", // ⚠️ mover al backend en producción
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: carrito.map((item) => ({
            title: item.title,
            unit_price: item.price,
            quantity: item.cantidad,
          })),
        }),
      });

      const data = await response.json();
      setPreferenceId(data.id);
    } catch (error) {
      console.error("Error al crear preferencia:", error);
    }
  };

  return (
    <div
      className="container mt-4"
      style={{
        "--primary": "#57ad88",
        "--primary-hover": "#4a9474",
        "--bg": "#fff",
        "--card-bg": "#ffffff",
        "--text": "#2c3e50",
        "--success": "#16a34a",
        "--error": "#dc2626",
        "--border": "#e2e8f0",
        "--shadow": "0 4px 15px rgba(0, 0, 0, 0.08)",
        "--radius": "12px",
        "--transition": "0.2s ease-in-out",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: "var(--text)" }}>🐾 Productos de Veterinaria</h2>
        <Button
          style={{
            backgroundColor: "var(--primary)",
            border: "none",
            transition: "var(--transition)",
          }}
          onClick={() => setMostrarCarrito(true)}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
        >
          🛒 Ver Carrito ({carrito.reduce((acc, item) => acc + item.cantidad, 0)})
        </Button>
      </div>

      <Row>
        {productosMock.map((producto) => (
          <Col key={producto.id} md={4} className="mb-4">
            <Card
              className="h-100"
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <Card.Img
                variant="top"
                src={producto.img}
                style={{
                  height: "200px",
                  objectFit: "contain",
                  padding: "10px",
                }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title style={{ color: "var(--text)" }}>
                  {producto.title}
                </Card.Title>
                <Card.Text style={{ fontWeight: "500", color: "var(--primary)" }}>
                  Precio: ${producto.price}
                </Card.Text>
                <Button
                  style={{
                    backgroundColor: "var(--primary)",
                    border: "none",
                  }}
                  onClick={() => agregarAlCarrito(producto)}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                >
                  Agregar al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 🔹 Offcanvas Carrito */}
      <Offcanvas show={mostrarCarrito} onHide={() => setMostrarCarrito(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de Compras</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {carrito.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <>
              <ListGroup variant="flush">
                {carrito.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.title}</strong>
                      <p className="mb-1">Cantidad: {item.cantidad}</p>
                      <p className="mb-0">Precio: ${item.price}</p>
                    </div>
                    <Button
                      size="sm"
                      style={{ backgroundColor: "var(--error)", border: "none" }}
                      onClick={() => quitarDelCarrito(item.id)}
                    >
                      Quitar
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="mt-3 text-end">
                <h5>
                  Total: ${carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0)}
                </h5>
                <Button
                  style={{ backgroundColor: "var(--success)", border: "none" }}
                  className="mt-2 w-100"
                  onClick={crearPreferencia}
                >
                  Proceder a Pagar
                </Button>
              </div>

              {preferenceId && (
                <div className="mt-3">
                  {/* <Wallet initialization={{ preferenceId }} /> */}
                </div>
              )}
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ProductosPage;
