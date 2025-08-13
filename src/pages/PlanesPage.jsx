import React from 'react';
import CardsPlanes from '../components/CardsPlanes';
import { Container } from 'react-bootstrap';
import FormularioPlanes from '../components/FormularioPlanes';

const PlanesPage = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4 fw-bold">Todos Nuestros Planes</h1>
      <p className="text-center text-muted mb-5">
        Elige el plan que mejor se adapte a las necesidades de tu mascota y disfruta de un cuidado integral.
      </p>
      {/* Usamos directamente CardsPlanes, que ya mapea todos los planes */}
      <CardsPlanes />
    </Container>
  );
};

export default PlanesPage;
