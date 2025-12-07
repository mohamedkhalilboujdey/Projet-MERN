import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function ProtectedRoute({ children }) {
    const { user } = useAuth(); // Récupère l'état de l'utilisateur

    if (!user) {
        // Redirige vers la page de login si l'utilisateur n'est pas connecté
        return <Navigate to="/login" replace />; 
    }

    return children;
}
export default ProtectedRoute;