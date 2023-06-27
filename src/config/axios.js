<<<<<<< HEAD
import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URLS}`,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default instance;
=======
import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URLS}`,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default instance;
>>>>>>> 249c57bfc6d68c4a5b435e819488e329cb6924d6
