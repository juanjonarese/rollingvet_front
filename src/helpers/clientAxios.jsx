import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

const token = JSON.parse(sessionStorage.getItem("token"));
console.log(token);

export const configHeaders = {
  headers: {
    "content-type": "application/json",
    auth: `${token}`,
  },
};

export default clientAxios;
