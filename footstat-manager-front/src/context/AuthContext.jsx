import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api'; // Instance Axios configurée (Semaine 10)

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    // Charger le token dès l'initialisation (méthode lazy initialization)
    const [token, setToken] = useState(() => localStorage.getItem('token') || null); 
    const [loading, setLoading] = useState(true);

    // Synchronisation : Met à jour l'état de l'utilisateur lorsque le token change
    useEffect(() => {
        if (token) {
            // Dans une vraie app, on ferait un appel /api/me pour récupérer les infos complètes
            // Ici, nous simulons en stockant juste un objet pour montrer la connexion
            
            // Simuler la récupération des données utilisateur à partir du token
            setUser({ id: 'simulated_id', username: 'ConnectedUser' }); 
            localStorage.setItem('token', token);
        } else {
            setUser(null);
            localStorage.removeItem('token');
        }
        setLoading(false); // Arrêter le chargement initial
    }, [token]);

    // 1. Fonction de LOGIN (Appel API réel)
    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });
            
            // Le serveur renvoie le JWT et les données utilisateur
            const { token: receivedToken, username } = response.data; 
            
            setToken(receivedToken); // Met à jour le state et déclenche l'useEffect ci-dessus
            
            // Stocker le token dans l'intercepteur Axios (via le localStorage)
            // L'intercepteur de api.js le récupérera automatiquement.

        } catch (err) {
            setLoading(false);
            throw new Error(err.response?.data?.message || "Erreur de connexion.");
        }
    };

    // 2. Fonction de LOGOUT
    const logout = () => {
        setToken(null); // Déclenche l'useEffect pour supprimer le token et réinitialiser l'utilisateur
    };

    const value = { user, token, loading, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personnalisé pour faciliter l'utilisation du contexte (Semaine 7)
export const useAuth = () => {
    return useContext(AuthContext);
};