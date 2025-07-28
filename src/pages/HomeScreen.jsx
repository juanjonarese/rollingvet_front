import React from "react";
import Card from '../components/Cards';

const HomeScreen = () => {
const cards = [
    { id: 1, titulo: 'Plan Básico "Cuida Tú Mascota"', descripcion: 'Ideal para dueños responsables con poco presupuesto.' },
    { id: 2, titulo: 'Plan Intermedio "Mascota Feliz"', descripcion: 'Para quienes quieren más control en la salud de su mascota.' },
    { id: 3, titulo: 'Plan Premium "Rolling VIP"', descripcion: 'Para dueños exigentes y mascotas mimadas.' },
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
