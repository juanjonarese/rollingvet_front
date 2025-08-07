import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.rolUsuario === "admin") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default AdminRoute;
