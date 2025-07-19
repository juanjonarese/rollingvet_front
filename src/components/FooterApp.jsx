const FooterApp = () => {
  return (
    <footer className="bg-dark py-5">
      <div className="container">
        <div className="row text-white">
          <div className="col-12 text-center">
            <h3>Veterinaria Rolling</h3>

            <p>Veterianria al cuidado de tus mascotas</p>

            <p>v1.0.0</p>
          </div>
          <div className="col-12 d-flex gap-3 justify-content-center">
            <i className="bi bi-instagram fs-3"></i>
            <i className="bi bi-tiktok fs-3"></i>
            <i className="bi bi-linkedin fs-3"></i>
          </div>
          <div className="col-12 text-center mt-3">
            <p>&copy; Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterApp;
