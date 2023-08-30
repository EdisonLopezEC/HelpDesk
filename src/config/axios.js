import axios from "axios";
import Cookies from "js-cookie";
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URLS}`,
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get("token"); // Obtener token desde la cookie
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default instance;
