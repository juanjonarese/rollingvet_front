import React from "react";
import { Navigate } from "react-router-dom";

// Ruta solo para admins
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.rolUsuario === "admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

// Ruta para admins y veterinarios
const AdminVetRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && (user.rolUsuario === "admin" || user.rolUsuario === "veterinario")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export { AdminRoute, AdminVetRoute };