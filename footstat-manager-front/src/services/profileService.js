// src/services/profileService.js
import api from './api';

// Lit le profil via l'ID de l'utilisateur
export const getProfileByUserId = async (userId) => {
    const response = await api.get(`/profiles/user/${userId}`);
    return response.data;
};

// Crée/Met à jour le profil (utilise le POST/UPSERT du backend)
export const updateProfile = async (userId, profileData) => {
    const response = await api.post(`/profiles/user/${userId}`, profileData);
    return response.data;
};