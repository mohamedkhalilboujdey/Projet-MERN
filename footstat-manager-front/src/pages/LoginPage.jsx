import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Hook personnalisé pour le contexte
import { useNavigate, Navigate } from 'react-router-dom'; // Hooks de React Router

function LoginPage() {
    // États locaux du formulaire (Semaine 7)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    // Récupération des fonctions et de l'état utilisateur/chargement depuis le contexte
    const { user, loading, login } = useAuth(); 
    
    const navigate = useNavigate(); // Hook pour la redirection programmatique

    // ------------------------------------------
    // Exigence du TP Complémentaire (Semaine 9) : 
    // Rediriger si l'utilisateur est déjà connecté.
    // ------------------------------------------
    useEffect(() => {
        // user est défini et le chargement est terminé
        if (!loading && user) { 
            // Redirige vers la page principale après connexion
            navigate('/blog', { replace: true }); 
        }
    }, [user, loading, navigate]);


    // ------------------------------------------
    // Gestion de la soumission du formulaire
    // ------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Réinitialiser les erreurs

        // Vérification simple côté client
        if (!email || !password) {
            setErrorMessage("Veuillez entrer votre email et votre mot de passe.");
            return;
        }

        try {
            // Appel de la fonction LOGIN du AuthContext, qui fait l'appel Axios à l'API
            await login(email, password); 
            
            // L'useEffect ci-dessus prendra le relais pour naviguer vers /blog
            
        } catch (error) {
            // Gérer les erreurs de connexion renvoyées par le AuthContext (ex: 401 Unauthorized)
            setErrorMessage(error.message || "Échec de la connexion. Veuillez vérifier vos identifiants.");
        }
    };
    
    // Si l'application est en cours de chargement (vérification initiale du token)
    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Chargement de la session...</div>;
    }

    // Si le user est déjà défini (et qu'il n'est pas redirigé par l'useEffect, 
    // on peut utiliser <Navigate> ici pour une redirection immédiate)
    // if (user) {
    //     return <Navigate to="/blog" replace />;
    // }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Connexion (Accès Manager)</h2>
            
            {/* Affichage des messages d'erreur API */}
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                
                <div style={styles.inputGroup}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="password" style={styles.label}>Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />
                </div>

                <button type="submit" style={styles.button}>
                    Se Connecter
                </button>
            </form>
            
            {/* Si vous avez une page d'inscription */}
            {/* <p style={{ marginTop: '20px' }}>Pas de compte ? <Link to="/register">Inscrivez-vous ici</Link></p> */}
        </div>
    );
}

// Styles minimalistes pour le composant (vous pouvez les déplacer dans un fichier CSS)
const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#3b82f6',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        fontSize: '0.9rem',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    },
    button: {
        padding: '10px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        marginBottom: '15px',
        border: '1px solid red',
        padding: '10px',
        backgroundColor: '#fee2e2',
        borderRadius: '4px',
    }
};

export default LoginPage;


