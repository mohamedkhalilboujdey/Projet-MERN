import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Layout() {
    const { user, logout } = useAuth(); // Accès au contexte

    return (
        <div>
            <nav style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Link to="/">Accueil</Link> | 
                    <Link to="/blog">Blog Manager</Link> |
                    <Link to="/dashboard">Dashboard</Link>
                </div>

                <div>
                    {user ? (
                        <>
                            <span style={{ marginRight: '15px' }}>Bienvenue, {user.username || 'Utilisateur'}</span>
                            <button onClick={logout}>Déconnexion</button>
                        </>
                    ) : (
                        <Link to="/login">Connexion</Link>
                    )}
                </div>
            </nav>
            <main>
                <Outlet /> {/* Les composants enfants seront rendus ici */}
            </main>
        </div>
    );
}
export default Layout;