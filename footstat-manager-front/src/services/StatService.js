// src/services/statService.js
import api from './api';

const API_URL = '/stats'; 

export const createStat = async (statData) => {
    // La route POST /api/stats est protégée, le token est ajouté par l'intercepteur.
    const response = await api.post(API_URL, statData);
    return response.data;
};

// Vous aurez aussi besoin de:
export const getPlayerPerformance = async (playerId) => {
    // Récupère toutes les performances enregistrées pour un joueur spécifique
    const response = await api.get(`${API_URL}?player=${playerId}`);
    return response.data;
};