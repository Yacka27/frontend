import { axiosInstance } from "../helper/axios-config";

const getDirector = () => {
    return axiosInstance.get('director', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearDirector = (data) => {
    return axiosInstance.post('director', data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const actualizarDirector = (directorId, data) => {
    return axiosInstance.put(`director/${directorId}`, data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}



export { actualizarDirector, crearDirector, getDirector };
