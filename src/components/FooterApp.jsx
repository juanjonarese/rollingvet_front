
import { Link } from 'react-router-dom';


import CardApiClima from "../components/CardApiClima";

const FooterApp = () => {
  return (
    <footer className="footer  text-white py-4">
      <div className="container">
        <div className="row text-white">

          <div className="col-12 text-center">
            <h3>Veterinaria Rolling</h3>

            <p>Veterinaria al cuidado de tus mascotas</p>

            <p>v1.0.0</p>
          </div>
          <div className="col-12 d-flex gap-3 justify-content-center">
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

          {/* Texto central */}
          <div className="col-12 col-md-4 mb-4 text-center">
            <h3>Veterinaria Rolling</h3>
            <p>Veterinaria al cuidado de tus mascotas</p>
            <p>v1.0.0</p>
          </div>

          {/* Clima */}
          <div className="col-12 col-md-4 d-flex justify-content-center">
            <div
              style={{ transform: "scale(0.9)", transformOrigin: "top center" }}
            >
              <CardApiClima />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterApp;
