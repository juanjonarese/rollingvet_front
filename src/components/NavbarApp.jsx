import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LoginModalApp from "./LoginModalApp";
import rollinglogo from "../assets/rollinglogo.svg";

const NavBarApp = () => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Detectar usuario logueado al montar y cuando cambie el modal
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("user");
    if (usuarioGuardado) {
      try {
        const userData = JSON.parse(usuarioGuardado);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [show]); // Se ejecuta cuando cambia el estado del modal

  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-montserrat">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={rollinglogo} alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link fw-bold nav-rolling" : "nav-link"
                  }
                  to="/"
                >
                  Inicio
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link fw-bold nav-rolling" : "nav-link"
                  }
                  to="/aboutuspage"
                >
                  Sobre Nosotros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link fw-bold nav-rolling" : "nav-link"
                  }
                  to="/products"
                >
                  Productos
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link fw-bold nav-rolling" : "nav-link"
                  }
                  to="/turnos"
                >
                  Turnos
                </NavLink>
              </li>

              {/* Botón de Admin - solo se muestra si el usuario es admin */}
              {user?.rolUsuario === "admin" && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Administrador
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/adminproducts">
                        Productos
                      </Link>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Pacientes
                      </a>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/adminusers">
                        Usuarios
                      </Link>
                    </li>
                  </ul>
                </li>
              )}

              <li className="nav-item">
                {user ? (
                  <button className="btn btn-login" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                ) : (
                  <button
                    className="btn  btn-login"
                    onClick={() => setShow(true)}
                  >
                    <FontAwesomeIcon icon={faUser} /> Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {show && <LoginModalApp show={show} handleClose={handleClose} />}
    </>
  );
};

export default NavBarApp;
