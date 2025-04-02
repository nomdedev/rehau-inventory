import axios from 'axios';

const API_URL = 'https://api.example.com/inventario';

export const getInventario = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createItemInventario = async (item) => {
    await axios.post(API_URL, item);
};

export const updateStock = async (id, nuevoStock) => {
    await axios.put(`${API_URL}/${id}`, { stock: nuevoStock });
};
