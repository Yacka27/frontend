import { axiosInstance } from "../helper/axios-config";

const getTipo = () => {
    return axiosInstance.get('tipo', {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const crearTipo = (data) => {
    return axiosInstance.post('tipo', data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}

const actualizarTipo = (tipoId, data) => {
    return axiosInstance.put(`tipo/${tipoId}`, data, {
        header: {
            'Content-Type': 'application/json'
        }
    });
}



export { actualizarTipo, crearTipo, getTipo };
