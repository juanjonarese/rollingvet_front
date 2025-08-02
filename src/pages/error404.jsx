import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const error404 = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 text-center">
      <Row>
        <Col>
          <h1 className="display-1 text-danger">404</h1>
          <h2 className="display-4 mb-4">Página no encontrada</h2>
          <p className="lead mb-4">
            Lo sentimos, la página que estás buscando no existe.
          </p>
          <Link to="/" className="text-decoration-none">
            <Button variant="primary" size="lg">
              Volver al inicio
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default error404;