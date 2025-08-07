import React, { useEffect, useState } from "react";

const CardApiClima = () => {
  //Api del clima
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

  return (
    <div
  className="card text-center shadow-sm"
  style={{ width: "100%", maxWidth: "250px", padding: "10px" }}
>
  <div className="card-body p-2">
    <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt="clima"
      style={{ width: "50px", height: "50px" }}
    />
    <h5 className="card-title mb-1">{Math.round(weather.main.temp)}°C</h5>
    <p className="card-text small mb-0">{weather.name}</p>
  </div>
</div>

  );
};

export default CardApiClima;
