import React, { useState, useEffect } from 'react';
import { getMatches, createMatch, deleteMatch } from '../services/matchService';
// Importez vos composants MatchForm et MatchList
import MatchForm from '../components/MatchForm'; // <-- Composant du formulaire
import MatchList from '../components/MatchList'; // <-- Composant de la liste

function MatchesPage() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Fonctions de l'API ---

    const fetchMatches = async () => {
        try {
            const data = await getMatches();
            setMatches(data); 
        } catch (err) {
            setError('Erreur lors du chargement des matchs.');
        } finally {
            setLoading(false);
        }
    };

    // Charger les matchs au montage
    useEffect(() => {
        fetchMatches();
    }, []);

    // Handler d'ajout
    const handleAddMatch = async (matchData) => {
        try {
            const newMatch = await createMatch(matchData);
            setMatches(prev => [newMatch, ...prev]); 
            return true;
        } catch (err) {
            alert(err.response?.data?.message || 'Erreur lors de l\'ajout du match.');
            return false;
        }
    };
    
    // Handler de suppression
    const handleDeleteMatch = async (id) => {
        if (window.confirm("Supprimer ce match ?")) {
            try {
                await deleteMatch(id);
                setMatches(prev => prev.filter(m => m._id !== id));
            } catch (err) {
                alert('Erreur lors de la suppression du match.');
            }
        }
    };

    if (loading) return <h2>Chargement des Matchs...</h2>;
    if (error) return <h2 style={{color: 'red'}}>Erreur: {error}</h2>;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
            <h1>Gestion des Matchs</h1>
            {/* Remplacer par votre composant MatchForm */}
            <MatchForm onAddMatch={handleAddMatch} />
            
            
            <h2>Liste des Matchs ({matches.length})</h2>
            {/* Remplacer par votre composant MatchList */}
            <div style={{border: '1px solid #ccc', padding: '15px'}}>Liste des Matchs (DELETE/READ)</div> 

            <MatchList 
                matches={matches} 
                onDeleteMatch={handleDeleteMatch} 
            />
        </div>
    );
}

export default MatchesPage;