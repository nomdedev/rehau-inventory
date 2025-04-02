import axios from 'axios';

const API_URL = 'https://api.example.com/auditoria';

export const getLogs = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
