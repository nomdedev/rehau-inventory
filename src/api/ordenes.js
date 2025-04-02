import axios from 'axios';

const API_URL = 'https://api.example.com/ordenes';

export const getOrdenes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createOrden = async (orden) => {
    await axios.post(API_URL, orden);
};
