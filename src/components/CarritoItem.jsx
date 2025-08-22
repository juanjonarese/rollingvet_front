import React from "react";
import { Card, Button, Col, Stack } from "react-bootstrap";

const CarritoItem = ({ item, onQuitar, onSumar, onRestar }) => {
  return (
    <Col md={6} lg={4} className="mb-4">
      <Card className="h-100 shadow-sm" style={{ border: "none", borderRadius: "12px", backgroundColor: "#fff" }}>
        <div style={{ height: "220px", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
          <Card.Img
            variant="top"
            src={item.img}
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>

        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title style={{ color: "#235850", fontWeight: "600" }}>{item.title}</Card.Title>
            <Card.Text style={{ color: "#347e71", fontSize: "1.1rem" }}>
              Precio: ${item.price}
            </Card.Text>
            <Card.Text style={{ color: "#3bb4a1", fontWeight: "500" }}>
              Cantidad: {item.cantidad}
            </Card.Text>
          </div>

          <Stack direction="horizontal" gap={2} className="mt-3 justify-content-center">
            <Button
              variant="success"
              onClick={() => onSumar(item.id)}
              style={{ width: "45px", height: "45px", fontSize: "1.2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              +
            </Button>
            <Button
              variant="warning"
              onClick={() => onRestar(item.id)}
              style={{ width: "45px", height: "45px", fontSize: "1.2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              −
            </Button>
            <Button
              variant="danger"
              onClick={() => onQuitar(item.id)}
              style={{ width: "45px", height: "45px", fontSize: "1.2rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              x
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CarritoItem;
