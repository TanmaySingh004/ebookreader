import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.25.111.55:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
