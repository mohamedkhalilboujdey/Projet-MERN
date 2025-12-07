import React, { useState, useEffect } from 'react'; // Correction de l'importation: { useState, useEffect }
import { getPlayers, createPlayer, deletePlayer } from './services/playerService'; // Importation des services API
import PlayerList from './components/PlayerList';
import PlayerForm from './components/PlayerForm';
import Header from './components/Header'; 
import Footer from './components/Footer'; 

// Données statiques initiales
const initialPlayers = [
    { 
        id: 1, 
        name: "L. Messi", 
        position: "Attaquant", 
        team: "Inter Miami",
        goals: 15,
        rating: 9.2
    },
    { 
        id: 2, 
        name: "K. De Bruyne", 
        position: "Milieu", 
        team: "Manchester City",
        goals: 5,
        rating: 8.8
    },
    { 
        id: 3, 
        name: "V. van Dijk", 
        position: "Défenseur", 
        team: "Liverpool",
        goals: 0,
        rating: 8.5
    },
];

function App() {

    const [players, setPlayers] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const data = await getPlayers(); // Vrai appel API
                setPlayers(data); 
            } catch (err) {
                setError('Impossible de charger les joueurs depuis l\'API.');
            } finally {
                setLoading(false);
            }
        };
        fetchPlayers();
    }, []);
    // Handler d'ajout (maintenant asynchrone)
    const handleAddPlayer = async (playerData) => {
        try {
            const newPlayer = await createPlayer(playerData); // Vrai appel POST
            // Ajout du joueur retourné par l'API (avec son vrai _id)
            setPlayers(prev => [newPlayer, ...prev]); 
            return true;
        } catch (err) {
            alert(err.response?.data?.message || 'Erreur lors de l\'ajout.'); // Afficher l'erreur du backend
            return false;
        }
    };

    // Handler de suppression (maintenant asynchrone)
    const handleDeletePlayer = async (id) => {
        if (window.confirm("Confirmer la suppression (via API)?")) {
            try {
                await deletePlayer(id); // Vrai appel DELETE
                // Mise à jour du state local (on filtre l'élément supprimé, utilisant l'ID MongoDB _id)
                setPlayers(prev => prev.filter(p => p._id !== id)); 
            } catch (err) {
                alert('Erreur lors de la suppression. Assurez-vous d\'être connecté (Token manquant).');
            }
        }
    };
    
    if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Chargement depuis l'API...</div>;
    if (error) return <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>Erreur: {error}</div>;
    
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            
            <Header title="FootStat Manager" subtitle={`Application MERN (${players.length} joueurs)`} />
            
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', flex: 1 }}>
                
                {/* 2. Formulaire d'ajout: lui passe la fonction pour modifier le state parent */}
                <PlayerForm onAddPlayer={handleAddPlayer} /> 

                <h2>Liste des Joueurs</h2>

                {/* 3. Liste des joueurs: lui passe le tableau de données et la fonction de suppression */}
                <PlayerList 
                    players={players} 
                    onDeletePlayer={handleDeletePlayer} 
                />

            </div>
            
            <Footer year={new Date().getFullYear()} author="École Polytechnique Sousse" />
        </div>
    );
}

export default App;