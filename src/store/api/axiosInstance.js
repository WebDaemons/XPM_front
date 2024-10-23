import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://backend.xpm.com.ua/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
