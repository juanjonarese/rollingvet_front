import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const productos = [
  { id: 1, title: "Vacuna Antirrábica", price: 2500, img: "https://placehold.co/300x200?text=Vacuna" },
  { id: 2, title: "Collar Antipulgas", price: 3200, img: "https://placehold.co/300x200?text=Collar" },
  { id: 3, title: "Alimento Premium 3kg", price: 7800, img: "https://placehold.co/300x200?text=Alimento" },
  { id: 4, title: "Juguete para Perro", price: 1500, img: "https://placehold.co/300x200?text=Juguete" },
  { id: 5, title: "Cama para Gato", price: 5400, img: "https://placehold.co/300x200?text=Cama" },
  { id: 6, title: "Shampoo Antipulgas", price: 2200, img: "https://placehold.co/300x200?text=Shampoo" },
];

const ProductosPage = ({ carrito, onAgregar, onQuitar }) => {
  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Container className="py-5">
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#235850" }}>
          🐾 Nuestros Productos Disponibles
        </h2>

        <Row>
          {productos.map((producto) => {
            const enCarrito = carrito?.some((item) => item.id === producto.id);
            return (
              <Col key={producto.id} md={4} sm={6} xs={12} className="mb-4">
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
                    src={producto.img}
                    style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title style={{ color: "#235850" }}>
                        {producto.title}
                      </Card.Title>
                      <Card.Text style={{ color: "#347e71", fontSize: "1.1rem" }}>
                        Precio: ${producto.price}
                      </Card.Text>
                    </div>

                    {enCarrito ? (
                      <Button
                        onClick={() => onQuitar && onQuitar(producto.id)}
                        style={{
                          backgroundColor: "#235850",
                          border: "none",
                          fontWeight: "bold",
                        }}
                      >
                        Quitar del Carrito ❌
                      </Button>
                    ) : (
                      <Button
                        onClick={() => onAgregar && onAgregar(producto)}
                        style={{
                          backgroundColor: "#57ad88",
                          border: "none",
                          fontWeight: "bold",
                        }}
                      >
                        Agregar al Carrito 🛒
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default ProductosPage;