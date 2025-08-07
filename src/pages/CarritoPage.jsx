import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import CarritoCheckout from "../components/CarritoCheckout";

function CarritoPage() {
  const [carrito, setCarrito] = useState([
    {
      id: 1,
      title: "Plan Control Básico",
      unit_price: 15000,
      quantity: 1,
    },
    {
      id: 2,
      title: "Plan Vacunación",
      unit_price: 20000,
      quantity: 1,
    },
  ]);

  const handleEliminar = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Tu Carrito</h2>
      <Row className="g-3">
        {carrito.length === 0 ? (
          <p className="text-center">El carrito está vacío.</p>
        ) : (
          carrito.map((item) => (
            <Col md={6} lg={4} key={item.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>Precio: ${item.unit_price}</Card.Text>
                  <Card.Text>Cantidad: {item.quantity}</Card.Text>
                  <Button variant="danger" onClick={() => handleEliminar(item.id)}>
                    Eliminar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {carrito.length > 0 && (
        <div className="mt-4">
          <CarritoCheckout carrito={carrito} />
        </div>
      )}
    </Container>
  );
}

export default CarritoPage;

