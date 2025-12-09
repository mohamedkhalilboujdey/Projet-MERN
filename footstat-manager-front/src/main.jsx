import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importations des composants
import App from './App.jsx'; // Votre composant principal (pour l'affichage du blog)
import Layout from './components/Layout'; // Contient la barre de navigation
import ProtectedRoute from './components/ProtectedRoute'; 

// Importation du Contexte d'Authentification
import { AuthProvider } from './context/AuthContext'; 

// Importation des Pages Minimales
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MatchesPage from './pages/MatchesPage';
import ProfilePage from './pages/ProfilePage';
import PlayerDetailsPage from './pages/PlayerDetailsPage';


// --- Définition des Routes ---
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Le Layout contient la navigation globale
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      
      // La route de votre application principale (où se trouve App.jsx)
      { 
          path: 'blog', 
          element: (
              <App /> // Utilisation de App.jsx comme une "page" de l'application
          )
      },
      
      // Exemple de Route Protégée
      { 
        path: 'matches', 
        element: <ProtectedRoute><MatchesPage /></ProtectedRoute> 
      },
      { 
        path: 'profile', 
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute> 
      },
      { 
        path: 'player/:id', // Route dynamique pour les détails
        element: <ProtectedRoute><PlayerDetailsPage /></ProtectedRoute> 
      },
      { 
        path: 'dashboard', 
        element: <ProtectedRoute><DashboardPage /></ProtectedRoute> 
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. On enveloppe TOUTE l'application avec le Provider */}
    <AuthProvider>
      {/* 2. On fournit le routeur */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);