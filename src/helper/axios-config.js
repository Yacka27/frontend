import axios from 'axios';

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:4000/'
    baseURL: 'https://peliculas-n97w.onrender.com/' 
});

export {
    axiosInstance
};
