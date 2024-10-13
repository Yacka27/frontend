import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/',
    baseURL: 'https://peliculas-1-o25j.onrender.com' 
});

export {
    axiosInstance
};
