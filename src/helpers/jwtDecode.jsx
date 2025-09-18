import { jwtDecode } from "jwt-decode";

const getDatosToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) return null;

    const datosToken = jwtDecode(token);

    return datosToken;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

export default getDatosToken;