import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:9191',
  });
  
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    response => response,
    error => {
        console.log("----------------> ",error.response)
        if (error.response.status === 401 ) {
            console.log("Token expired go to LOGIN screen")
            localStorage.clear();
            window.location.href = "/"
        }
        return Promise.reject(error);
    }
);

export default api;
