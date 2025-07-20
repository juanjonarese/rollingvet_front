import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import LoginModalApp from "./LoginModalApp";

const NavBarApp = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   setUser(null);
  //   navigate("/");
  // };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Logo VET
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
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link fw-bold nav-rolling" : "nav-link"
                  }
                  to="/about"
                >
                  About
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

              {/* {user?.rol === "admin" && (
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-link fw-bold nav-rolling" : "nav-link"
                    }
                    to="/admin"
                  >
                    Admin
                  </NavLink>
                </li>
              )} */}

              <li className="nav-item">
                <button
                  className="btn btn-danger"
                  onClick={() => setShow(true)}
                >
                  <FontAwesomeIcon icon={faUser} /> Login
                </button>
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
