import api from './api';

const API_URL = '/players'; // Basé sur baseURL de api.js

export const getPlayers = async () => {
    const response = await api.get(API_URL);
    return response.data; // Axios parse déjà le JSON [cite: 331]
};

export const createPlayer = async (playerData) => {
    const response = await api.post(API_URL, playerData);
    return response.data;
};

export const deletePlayer = async (id) => {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
};
// Vous auriez aussi updatePlayer ici