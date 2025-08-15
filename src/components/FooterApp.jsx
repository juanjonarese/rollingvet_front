
import { Link } from 'react-router-dom';


import CardApiClima from "../components/CardApiClima";

const FooterApp = () => {
  return (
   <footer className="footer text-white py-4">
  <div className="container">
    <div className="row align-items-center text-center">

      {/* Izquierda - Íconos */}
      <div className="col-lg-4 col-sm-12 d-flex justify-content-center justify-content-lg-start gap-3">
        <Link to="/Error404" className="text-decoration-none text-white">
          <i className="bi bi-instagram fs-3"></i>
        </Link>
        <Link to="/Error404" className="text-decoration-none text-white">
          <i className="bi bi-tiktok fs-3"></i>
        </Link>
        <Link to="/Error404" className="text-decoration-none text-white">
          <i className="bi bi-linkedin fs-3"></i>
        </Link>
      </div>

      {/* Centro - Texto */}
      <div className="col-lg-4 col-sm-12">
        <h3>Veterinaria Rolling</h3>
        <p>Veterinaria al cuidado de tus mascotas</p>
        <p>v1.0.0</p>
      </div>

      {/* Derecha - Clima */}
      <div className="col-lg-4 col-sm-12 d-flex justify-content-center justify-content-lg-end">
        <div style={{ transform: "scale(0.9)", transformOrigin: "top center" }}>
          <CardApiClima />
        </div>
      </div>

    </div>
  </div>
</footer>



  );
};

export default FooterApp;
