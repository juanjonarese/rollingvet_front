import React from "react";
import { useState, useEffect } from "react";
import Card from "../components/Cards";

const HomeScreen = () => {
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Tucuman,ar&appid=02d9a67ec00671e70ca864ce2b41bfa8&units=metric"
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (!weather) return <div className="text-center">Cargando...</div>;

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

  return (
    <>
      <div
        className="card text-center"
        style={{ maxWidth: "200px", margin: "0 auto" }}
      >
        <div className="card-body">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="clima"
            className="img-fluid"
          />
          <h3 className="card-title">{Math.round(weather.main.temp)}°C</h3>
          <p className="card-text">{weather.name}</p>
        </div>
      </div>

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
