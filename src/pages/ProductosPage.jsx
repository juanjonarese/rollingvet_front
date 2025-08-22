import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const productos = [
  { id: 1, title: "Vacuna Antirrábica", price: 2500, img: "https://www.profesionalvet.com.ar/891-thickbox_default/vacuna-defensor-1-1-dosis.jpg" },
  { id: 2, title: "Collar Antipulgas", price: 3200, img: "https://acdn-us.mitiendanube.com/stores/002/330/019/products/e277c53c-a567-4810-afb8-da626d2602071-413757df75585a4e5516722404441765-1024-1024.jpeg" },
  { id: 3, title: "Alimento Premium 3kg", price: 7800, img: "https://http2.mlstatic.com/D_NQ_NP_813198-MLU73026788754_112023-O.webp" },
  { id: 4, title: "Juguete para Perro", price: 1500, img: "https://http2.mlstatic.com/D_NQ_NP_978610-MLA89354187403_082025-O.webp" },
  { id: 5, title: "Cama para Gato", price: 5400, img: "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/productos/b/0000023000/23827.jpg" },
  { id: 6, title: "Shampoo Antipulgas", price: 2200, img: "https://veterinariassanbenito.com/web/image/product.template/18501/image_256/SHAMPOO%20OSSPRET%20AQUA%20ECTO%20-%20CACHORRO?unique=20b57d1" },
];

const ProductosPage = ({ carrito, onAgregar, onQuitar }) => {
  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Container className="py-5">
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#235850" }}>
          🐾 Nuestros Productos Disponibles
        </h2>

        <Row className="justify-content-center">
          {productos.map((producto) => {
            const enCarrito = carrito?.some((item) => item.id === producto.id);
            return (
              <Col key={producto.id} md={4} sm={6} xs={12} className="mb-4 d-flex justify-content-center">
                <Card
                  className="h-100 shadow-sm d-flex flex-column"
                  style={{
                    border: "none",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    maxWidth: "300px",
                    width: "100%",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "250px", overflow: "hidden" }}>
                    <Card.Img
                      src={producto.img}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between align-items-center text-center">
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
