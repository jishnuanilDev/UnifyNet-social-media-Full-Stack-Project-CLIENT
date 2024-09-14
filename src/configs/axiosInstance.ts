
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Set your API base URL here
  headers: {
    'Content-Type': 'application/json',
    // You can add any other default headers you want here
  },
});

// Adding an interceptor to automatically include the token in every request
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const userToken = localStorage.getItem('userToken');
//     if (userToken) {
//       config.headers.Authorization = `Bearer ${userToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Optional: Add a response interceptor for handling errors globally
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized access (e.g., redirect to login)
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
