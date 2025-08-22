import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import CarritoItem from "../components/CarritoItem";

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
              <CarritoItem
                key={item.id}
                item={item}
                onQuitar={onQuitar}
                onSumar={onSumar}
                onRestar={onRestar}
              />
            ))}
          </Row>
        )}

        {carrito.length > 0 && (
          <div className="text-center mt-4">
            <h3 style={{ color: "#235850" }}>Total: ${total}</h3>
            <Button
              style={{ backgroundColor: "#57ad88", border: "none", fontWeight: "bold" }}
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
