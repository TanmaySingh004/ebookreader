import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://3.25.111.55:5001',
   baseURL: 'http://localhost:5001',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
