import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ titulo, descripcion }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/formulario');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 20, width: 250 }}>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <button onClick={handleClick}>Más información</button>
    </div>
  );
}

export default Card;
