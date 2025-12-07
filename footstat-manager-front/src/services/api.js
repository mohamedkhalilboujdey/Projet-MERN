import axios from 'axios';

// Crée une instance Axios avec l'URL de base du back-end [cite: 388, 390]
const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Assurez-vous que c'est le port de votre serveur Express
});

// Intercepteur pour ajouter le JWT à chaque requête [cite: 334]
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
        // Ajoute l'en-tête Authorization pour les routes protégées [cite: 956]
        config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
});

export default api;