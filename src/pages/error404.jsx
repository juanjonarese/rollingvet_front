import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 text-center">
      <Row>
        <Col>
        <div className="my-5">
            <img 
              src="https://i.gifer.com/7VE.gif" 
              alt="Página no encontrada" 
              className="img-fluid"
              style={{ maxWidth: '400px', height: 'auto' }}
            />
          </div>
          <h1 className="display-1 text-danger">404</h1>
          <h2 className="display-4 mb-4">Página no encontrada</h2>

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

export default Error404;