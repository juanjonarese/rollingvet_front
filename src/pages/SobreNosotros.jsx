import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import juanImage from "../assets/juan.png";
import luchoImage from "../assets/lucho.png";
import leonelImage from "../assets/leonel.png";
import facuImage from "../assets/facu.jpg"

const SobreNosotros = () => {
  return (
    <Container fluid className="aboutus-container py-5">
      <Row className="justify-content-center text-center">
        <Col md={10} lg={8}>
          <h1 className="aboutus-title mb-4">Sobre Nosotros</h1>
          <p className="aboutus-text mb-5">
            Somos un equipo apasionado dedicado a mejorar la experiencia
            veterinaria a través de la tecnología. Nuestra visión es simplificar
            y potenciar el cuidado animal. Creemos firmemente en la empatía, la
            innovación y la dedicación, y nos esforzamos por brindar
            herramientas que marquen la diferencia.
          </p>
        </Col>
      </Row>

      <Row className="image-grid justify-content-center g-4 mb-5">
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className="d-flex justify-content-center"
        >
          <div className="grid-item-image">
            <Image src={juanImage} alt="Juan" fluid rounded />
            <p className="image-caption mt-2">Juan Narese</p>
          </div>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className="d-flex justify-content-center"
        >
          <div className="grid-item-image">
            <Image src={luchoImage} alt="Lucho" fluid rounded />
            <p className="image-caption mt-2">Lucho Martínez</p>
          </div>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className="d-flex justify-content-center"
        >
          <div className="grid-item-image">
            <Image src={leonelImage} alt="Leonel" fluid rounded />
            <p className="image-caption mt-2">Leonel Salvatierra</p>
          </div>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={3}
          className="d-flex justify-content-center"
        >
          <div className="grid-item-image">
            <Image src={facuImage} alt="facu" fluid rounded />
            <p className="image-caption mt-2">Facundo Cuellar</p>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          <Link to="/" className="text-decoration-none">
            <Button variant="outline-success" size="lg">
              Volver al Inicio
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SobreNosotros;
