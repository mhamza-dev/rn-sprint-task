import axios from "axios";

const ApiClient = axios.create({
  baseURL: "http://10.10.41.144:3001",
  // Added timeout for better error handling
  timeout: 10000,
  // Proper headers for JSON communication
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor for logging (optional)
ApiClient.interceptors.request.use(
  (config) => {
    console.log("RequestConfig:", config);
    console.log("Request:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export default ApiClient;
