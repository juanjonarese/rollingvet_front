import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import juanImage from '../assets/juan.jpg';

const AboutUsPage = () => {
  return (
    <Container fluid className="aboutus-container py-5">
      <Row className="justify-content-center text-center">
        <Col md={10} lg={8}>
          <h1 className="aboutus-title mb-4">Sobre Nosotros</h1>
          <p className="aboutus-text mb-5">
            Somos un equipo apasionado dedicado a [tu misión o lo que hace tu empresa/proyecto].
            Nuestra visión es [tu visión]. Creemos firmemente en [tus valores clave]
            y nos esforzamos por [lo que quieres lograr].
            Con años de experiencia en [tu campo], estamos comprometidos con la excelencia
            y la satisfacción de nuestros usuarios/clientes.
          </p>
        </Col>
      </Row>

      <Row className="image-grid justify-content-center g-4 mb-5">

        <Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
          <div className="grid-item-image">
            <Image src={juanImage} alt="Miembro del equipo 1" fluid rounded />
            <p className="image-caption mt-2">Nuestro equipo de desarrollo</p>
          </div>
        </Col>

        {/* Segunda imagen */}
        <Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
          <div className="grid-item-image">
            <Image src="https://placehold.co/400x300/957DAD/FFFFFF?text=Misión" alt="Nuestra misión" fluid rounded />
            <p className="image-caption mt-2">Trabajando en nuestra misión</p>
          </div>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
          <div className="grid-item-image">
            <Image src="https://placehold.co/400x300/FFC72C/FFFFFF?text=Valores" alt="Nuestros valores" fluid rounded />
            <p className="image-caption mt-2">Valores que nos guían</p>
          </div>
        </Col>

        {/* Cuarta imagen */}
        <Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
          <div className="grid-item-image">
            <Image src="https://placehold.co/400x300/C3F8FF/FFFFFF?text=Visión" alt="Nuestra visión a futuro" fluid rounded />
            <p className="image-caption mt-2">Mirando hacia el futuro</p>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          <Link to="/" className="text-decoration-none">
            <Button variant="outline-primary" size="lg">
              Volver al Inicio
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsPage;