import axios from "axios";

const clientAxios = axios.create({
  baseURL: "https://rollingvet-db.vercel.app/",
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
