import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://16.176.12.137:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
