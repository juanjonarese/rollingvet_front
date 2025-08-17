import React from 'react';
import CardsPlanes from '../components/CardsPlanes';
import { Container } from 'react-bootstrap';

const PlanesPage = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4 fw-bold">Todos Nuestros Planes</h1>
      <p className="text-center text-muted mb-5">
        Elige el plan que mejor se adapte a las necesidades de tu mascota y disfruta de un cuidado integral.
      </p>
      <CardsPlanes />
    </Container>
  );
};

export default PlanesPage;
