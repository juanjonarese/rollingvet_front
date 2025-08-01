import React from "react";
import { useState, useEffect } from "react";
import Card from "../components/Cards";
import CarouselApp from "../components/CarouselApp";
import CardApiClima from "../components/CardApiClima";

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
    {
      src: "1.jpg",
      alt: "Imagen 1",
    },
    {
      src: "2.jpg",
      alt: "Imagen 2",
    },
    {
      src: "3.jpg",
      alt: "Imagen 3",
    },
  ];

  return (
    <>
      <CarouselApp carouselImg={carouselImg} id={"carousel1"} />

      <CardApiClima />

      <div
        style={{ display: "flex", justifyContent: "space-around", padding: 20 }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            titulo={card.titulo}
            descripcion={card.descripcion}
          />
        ))}
      </div>
    </>
  );
};

export default HomeScreen;
