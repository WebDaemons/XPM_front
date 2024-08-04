import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://backend.xpm.com.ua/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;