import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ titulo, descripcion }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/FormularioPlanes');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 20, width: 250 }}>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <button onClick={handleClick} className='btn btn-danger'>Más información</button>
    </div>
  );
}

export default Card;
