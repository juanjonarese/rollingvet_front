import React from "react";
import { Container } from "react-bootstrap";
import CarritoMP from "../components/CarritoMp"; 

function CheckoutPage() {
  return (
    <Container className="mt-5">
      <h2 className="mb-4">Finalizar Compra</h2>
      <CarritoMP />
    </Container>
  );
}

export default CheckoutPage;
