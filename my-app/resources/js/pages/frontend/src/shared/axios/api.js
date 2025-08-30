import axios from 'axios';

const api = axios.create(
    baseUrl = 'http://localhost:5000/'
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error?.response?.data.message || error.message || '';
        console.log('API error', message);
        return Promise.reject(message);
    }
)