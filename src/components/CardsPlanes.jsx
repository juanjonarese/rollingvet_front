import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const planes = [
  {
    id: 1,
    title: 'Plan Básico',
    description: 'Consulta general, vacunación anual y desparasitación.',
    price: '$30.000/mes',
    colorClass: 'custom-success-color'
  },
  {
    id: 2,
    title: 'Plan Intermedio',
    description: 'Todo el Plan Básico + limpieza dental y seguimiento semestral.',
    price: '$50.000/mes',
    colorClass: 'custom-primary-color'
  },
  {
    id: 3,
    title: 'Plan Premium',
    description: 'Todo el Plan Intermedio + emergencias 24/7 y chequeos trimestrales.',
    price: '$80.000/mes',
    colorClass: 'custom-warning-color'
  }
];

const CardsPlanes = () => {
  const navigate = useNavigate();

  const handleConsult = () => {
    navigate('/FormularioPlanes');
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-5 fw-bold">Nuestros Planes</h2>
      <Row className="g-4 justify-content-center">
        {planes.map((plan) => (
          <Col lg={4} md={6} sm={12} key={plan.id}>
            <Card className="h-100 shadow-lg border-0 rounded-4">
              <Card.Body className="d-flex flex-column text-center p-4">
                <Card.Title className={`fs-4 text-uppercase ${plan.colorClass} fw-bold`}>
                  {plan.title}
                </Card.Title>
                <Card.Text className="flex-grow-1">{plan.description}</Card.Text>
                <Card.Text className={`fw-bold ${plan.colorClass}`}>{plan.price}</Card.Text>
                <Button
                  style={{ 
                    backgroundColor: '#57ad88', 
                    borderColor: '#57ad88' 
                  }}
                  className="mt-auto fw-semibold"
                  onClick={handleConsult}
                >
                  Consultar sobre este plan
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardsPlanes;
