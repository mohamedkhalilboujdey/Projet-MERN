// src/services/matchService.js
import api from './api';

const API_URL = '/matches'; 

export const getMatches = async () => {
    const response = await api.get(API_URL);
    return response.data;
};

export const createMatch = async (matchData) => {
    const response = await api.post(API_URL, matchData);
    return response.data;
};

export const deleteMatch = async (id) => {
    const response = await api.delete(`${API_URL}/${id}`);
    return response.data;
};
// Ajoutez les fonctions pour updateMatch si vous en avez besoin.