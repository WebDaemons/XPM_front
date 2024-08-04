import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://176.98.26.195/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;