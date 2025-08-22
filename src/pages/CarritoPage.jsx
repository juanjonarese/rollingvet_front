import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const CarritoPage = ({ carrito, onQuitar, onSumar, onRestar }) => {
  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Container className="py-5">
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#235850" }}>
          🛒 Tu Carrito de Compras
        </h2>

        {carrito.length === 0 ? (
          <p className="text-center fs-4" style={{ color: "#347e71" }}>
            Tu carrito está vacío 🐾
          </p>
        ) : (
          <Row>
            {carrito.map((item) => (
              <Col key={item.id} md={6} lg={4} className="mb-4">
                <Card
                  className="h-100 shadow-sm"
                  style={{
                    border: "none",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={item.img}
                    style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title style={{ color: "#235850" }}>{item.title}</Card.Title>
                      <Card.Text style={{ color: "#347e71", fontSize: "1.1rem" }}>
                        Precio: ${item.price}
                      </Card.Text>
                      <Card.Text style={{ color: "#3bb4a1" }}>
                        Cantidad: {item.cantidad}
                      </Card.Text>
                    </div>

                    <div className="d-flex justify-content-between mt-2">
                      <Button
                        size="sm"
                        onClick={() => onRestar(item.id)}
                        style={{ backgroundColor: "#347e71", border: "none" }}
                      >
                        ➖
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onSumar(item.id)}
                        style={{ backgroundColor: "#57ad88", border: "none" }}
                      >
                        ➕
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onQuitar(item.id)}
                        style={{ backgroundColor: "#235850", border: "none" }}
                      >
                        ❌
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {carrito.length > 0 && (
          <div className="text-center mt-4">
            <h3 style={{ color: "#235850" }}>Total: ${total}</h3>
            <Button
              style={{
                backgroundColor: "#57ad88",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Finalizar Compra 💳
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default CarritoPage;
