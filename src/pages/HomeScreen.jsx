import { useState, useEffect } from "react";
import CarouselApp from "../components/CarouselApp";
import banner from "../assets/banner.jpeg";
import CardsPlanes from '../components/CardsPlanes';
import { Container } from 'react-bootstrap';

import "../css/home.css";

const HomeScreen = () => {
  const cards = [
    {
      id: 1,
      titulo: 'Plan Básico "Cuida Tú Mascota"',
      descripcion: "Ideal para dueños responsables con poco presupuesto.",
    },
    {
      id: 2,
      titulo: 'Plan Intermedio "Mascota Feliz"',
      descripcion:
        "Para quienes quieren más control en la salud de su mascota.",
    },
    {
      id: 3,
      titulo: 'Plan Premium "Rolling VIP"',
      descripcion: "Para dueños exigentes y mascotas mimadas.",
    },
  ];

  const carouselImg = [
    { src: "1.jpg", alt: "Imagen 1" },
    { src: "2.jpg", alt: "Imagen 2" },
    { src: "3.jpg", alt: "Imagen 3" },
  ];

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          <CarouselApp carouselImg={carouselImg} id={"carousel1"} />
        </div>
      </div>

      <div className="container my-1">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 p-4 rounded emergencia-banner">
            <div className="row">
              <div className="col-12 col-sm-6 d-flex align-items-start gap-3">
                <div className="display-6 text-white">✱</div>
                <div>
                  <h4 className="text-white mb-1">Emergencias</h4>
                  <p className="text-white mb-0">
                    Atendemos 24 hs.
                    <br /> Servicio de ambulancia.
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 text-sm-end mt-3 mt-sm-0">
                <small className="text-white-50">LLAMANOS AL</small>
                <h3 className="m-0 fw-bold text-white">0800 555 65858</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container texto-home ">
        <div className="row">
          <div className="row justify-content-between align-items-center text-center ">
            <div className="col-md-12 mb-1 mt-3">
              <h1>RollingVet</h1>
            </div>
          </div>
          <div className="col-md-12 bg-light p-3 rounded w-70">
            <p className="text-justify">
              En RollingVet nos dedicamos con pasión al cuidado integral de tu
              mascota. Ofrecemos atención veterinaria de calidad, tratamientos
              personalizados y asesoramiento profesional en cada etapa de su
              vida. Contamos con un sistema de turnos online para que puedas
              reservar tu cita de forma rápida y cómoda desde donde estés. Tu
              mascota es parte de tu familia, y en RollingVet la cuidamos como
              tal. No dudes en consultarnos para brindarle a tu compañero peludo
              una vida larga, feliz y saludable.
            </p>
          </div>
        </div>
      </div>

      {/* Cards de planes */}
    <Container className="my-5">
      <CardsPlanes />
    </Container>
      <div className="container-fluid px-0 mb-3 px-5">
        <div className="bg-light text-center">
          <img src={banner} alt="Banner" className="img-fluid w-100" />
        </div>
      </div>
    </>

)
}

export default HomeScreen;


