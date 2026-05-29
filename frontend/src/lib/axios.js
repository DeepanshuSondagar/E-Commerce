import axios from "axios";

const isDev = import.meta.env.DEV;

const axiosInstance = axios.create({
    // In development call the backend directly to avoid proxy cookie forwarding issues.
    baseURL: isDev ? "http://localhost:5000/api" : "/api",
    withCredentials: true, // send cookies to the server
    timeout: 8000,
 });

export default axiosInstance;
