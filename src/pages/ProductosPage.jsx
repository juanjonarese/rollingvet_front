import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Offcanvas,
  ListGroup,
  Badge,
} from "react-bootstrap";

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
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const crearPreferencia = async () => {
    try {
      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Authorization": "Bearer TU_ACCESS_TOKEN_AQUI",
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
    <div className="container mt-4">
      {/* Encabezado con botón carrito */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: "#235850", fontWeight: "700" }}>🐾 Productos de Veterinaria</h2>
        <Button
          style={{ backgroundColor: "#57ad88", border: "none", position: "relative" }}
          onClick={() => setMostrarCarrito(true)}
        >
          🛒 Carrito{" "}
          <Badge
            bg="danger"
            pill
            style={{ position: "absolute", top: "-5px", right: "-10px" }}
          >
            {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
          </Badge>
        </Button>
      </div>

      {/* Cards de productos */}
      <Row>
        {productosMock.map((producto) => (
          <Col key={producto.id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <Card.Img
                variant="top"
                src={producto.img}
                style={{ height: "200px", objectFit: "contain", padding: "10px" }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title style={{ color: "#235850", fontWeight: "600" }}>
                  {producto.title}
                </Card.Title>
                <Card.Text style={{ fontWeight: "500", color: "#347e71" }}>
                  Precio: ${producto.price}
                </Card.Text>
                <Button
                  style={{ backgroundColor: "#57ad88", border: "none" }}
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Offcanvas Carrito */}
      <Offcanvas show={mostrarCarrito} onHide={() => setMostrarCarrito(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: "#235850", fontWeight: "700" }}>
            🛒 Carrito de Compras
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {carrito.length === 0 ? (
            <p style={{ color: "#347e71" }}>No hay productos en el carrito.</p>
          ) : (
            <>
              <ListGroup variant="flush">
                {carrito.map((item) => (
                  <ListGroup.Item
                    key={item.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong style={{ color: "#235850" }}>{item.title}</strong>
                      <p className="mb-1" style={{ color: "#347e71" }}>
                        Cantidad: {item.cantidad}
                      </p>
                      <p className="mb-0" style={{ color: "#4caf8f", fontWeight: "600" }}>
                        Precio: ${item.price}
                      </p>
                    </div>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        style={{ backgroundColor: "#57ad88", border: "none" }}
                        onClick={() => agregarAlCarrito(item)}
                      >
                        ➕
                      </Button>
                      <Button
                        size="sm"
                        style={{ backgroundColor: "#ffc107", border: "none", color: "#235850" }}
                        onClick={() => quitarDelCarrito(item.id)}
                      >
                        ➖
                      </Button>
                      <Button
                        size="sm"
                        style={{ backgroundColor: "#d9534f", border: "none" }}
                        onClick={() => eliminarProducto(item.id)}
                      >
                        🗑
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="mt-3 text-end">
                <h5 style={{ color: "#57ad88" }}>
                  Total: ${carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0)}
                </h5>
                <Button
                  className="mt-2 w-100"
                  style={{ backgroundColor: "#57ad88", border: "none" }}
                  onClick={crearPreferencia}
                >
                  Proceder a Pagar
                </Button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default ProductosPage;
