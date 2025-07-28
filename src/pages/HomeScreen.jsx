import React from "react";
import Card from '../components/Cards';

const HomeScreen = () => {
const cards = [
    { id: 1, titulo: 'Plan 1', descripcion: 'Descripción del Plan 1' },
    { id: 2, titulo: 'Plan 2', descripcion: 'Descripción del Plan 2' },
    { id: 3, titulo: 'Plan 3', descripcion: 'Descripción del Plan 3' },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: 20 }}>
      {cards.map(card => (
        <Card key={card.id} titulo={card.titulo} descripcion={card.descripcion} />
      ))}
    </div>
  );
};

export default HomeScreen;
