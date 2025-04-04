import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api', 
});


//Add token to local storage if available
instance.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    };

    return config;
});

export default instance;