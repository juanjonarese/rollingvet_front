// src/components/CarritoMP.jsx
import React, { useState } from "react";
import { Card, Button, ListGroup, Row, Col, Alert, Spinner } from "react-bootstrap";

function CarritoMP() {
  const [carrito, setCarrito] = useState([
    { id: 1, title: "Vacuna Antirrábica", unit_price: 2500, quantity: 1 },
    { id: 2, title: "Collar Antipulgas", unit_price: 3200, quantity: 1 },
  ]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const agregar = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const quitar = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = carrito.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const items = carrito.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: "ARS",
      }));

      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (response.ok && data.init_point) {
        window.open(data.init_point, "_blank");
      } else {
        throw new Error(data?.msg || "No se pudo generar el link de pago.");
      }
    } catch (error) {
      console.error("Error en el pago:", error);
      setErrorMsg("Ocurrió un error al procesar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Header as="h5">🛒 Carrito de Compras Veterinaria</Card.Header>
      <ListGroup variant="flush">
        {carrito.length === 0 ? (
          <ListGroup.Item className="text-center text-muted">
            El carrito está vacío.
          </ListGroup.Item>
        ) : (
          carrito.map((item) => (
            <ListGroup.Item key={item.id}>
              <Row className="align-items-center">
                <Col xs={5}>
                  <strong>{item.title}</strong>
                </Col>
                <Col xs={3}>${item.unit_price}</Col>
                <Col xs={4}>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => quitar(item.id)}
                  >
                    −
                  </Button>{" "}
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => agregar(item.id)}
                  >
                    +
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
      <Card.Footer>
        <Row className="align-items-center">
          <Col>
            <strong>Total: ${total.toFixed(2)}</strong>
          </Col>
          <Col className="text-end">
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            <Button
              variant="success"
              onClick={handleCheckout}
              disabled={loading || carrito.length === 0}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Procesando...
                </>
              ) : (
                "Pagar con MercadoPago"
              )}
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
}

export default CarritoMP;
