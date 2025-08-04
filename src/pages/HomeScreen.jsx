import { useState, useEffect } from "react";
import Card from "../components/Cards";
import CarouselApp from "../components/CarouselApp";
import CardApiClima from "../components/CardApiClima";
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
      <CarouselApp carouselImg={carouselImg} id={"carousel1"} />

      <div className="container mt-4">
        {/* Imagen publicitaria */}
        <div className="text-center mb-4">
          <img
            src="https://www.pedigree.com.ar/cdn-cgi/image/format=auto,q=90/sites/g/files/fnmzdf1506/files/2022-10/landing-hero-adult-default.png"
            alt="Publicidad"
            className="img-fluid"
          />
        </div>

        {/* Título y clima en la misma fila */}
        <div className="row justify-content-between align-items-center text-center text-md-start mb-3">
          <div className="col-md-8 mb-3 mb-md-0">
            <h2>Rolling Vet</h2>
          </div>
          
        </div>

        {/* Descripción */}
        <div className="row ">
          <div className="col-md-10 bg-light p-3 rounded">
            <p>
              En RollingVet nos dedicamos con pasión al cuidado integral de tu mascota. Ofrecemos atención veterinaria de calidad, tratamientos personalizados y asesoramiento profesional en cada etapa de su vida.
              Contamos con un sistema de turnos online para que puedas reservar tu cita de forma rápida y cómoda desde donde estés. 
              Tu mascota es parte de tu familia, y en RollingVet la cuidamos como tal. No dudes en consultarnos para brindarle a tu compañero peludo una vida larga, feliz y saludable.
            </p>
          </div>
          
          <div className="col-md-2 d-flex justify-content-md-end justify-content-center">

            <CardApiClima />
          </div>
        </div>
      </div>

      {/* Cards de planes */}
      <div className="container py-4">
        <div className="row justify-content-center">
          {cards.map((card) => (
            <div key={card.id} className="col-md-4 mb-3">
              <Card titulo={card.titulo} descripcion={card.descripcion} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
