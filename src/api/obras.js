import axios from 'axios';

const API_URL = 'https://api.example.com/obras';

export const getObras = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createObra = async (obra) => {
    await axios.post(API_URL, obra);
};
