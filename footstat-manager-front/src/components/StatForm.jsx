import React, { useState, useEffect } from 'react';
import { getPlayers } from '../services/playerService';
import { getMatches } from '../services/matchService';
import { createStat } from '../services/statService';

function StatForm({ onStatAdded }) { // onStatAdded: fonction pour rafraîchir le dashboard après ajout
    // États pour les listes déroulantes
    const [players, setPlayers] = useState([]);
    const [matches, setMatches] = useState([]);
    
    // États du formulaire
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [selectedMatch, setSelectedMatch] = useState('');
    const [goals, setGoals] = useState(0);
    const [assists, setAssists] = useState(0);
    const [minutes, setMinutes] = useState(90);
    const [rating, setRating] = useState(6.0);
    
    const [message, setMessage] = useState('');

    // 1. Charger les Joueurs et les Matchs au démarrage
    useEffect(() => {
        const fetchData = async () => {
            try {
                const playersData = await getPlayers();
                const matchesData = await getMatches();
                setPlayers(playersData);
                setMatches(matchesData);
            } catch (error) {
                console.error("Erreur chargement listes", error);
            }
        };
        fetchData();
    }, []);

    // 2. Gérer la soumission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!selectedPlayer || !selectedMatch) {
            setMessage("❌ Veuillez sélectionner un joueur et un match.");
            return;
        }

        const newStat = {
            player: selectedPlayer,
            match: selectedMatch,
            goals: Number(goals),
            assists: Number(assists),
            minutesPlayed: Number(minutes),
            rating: Number(rating)
        };

        try {
            await createStat(newStat);
            setMessage("✅ Statistique ajoutée avec succès !");
            // Réinitialiser les champs
            setGoals(0); setAssists(0); setRating(6.0);
            // Appeler le rafraîchissement si la fonction est passée
            if(onStatAdded) onStatAdded();
        } catch (error) {
            setMessage("❌ Erreur : " + (error.response?.data?.message || "Erreur serveur"));
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
            <h3>Ajouter une Performance</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
                {/* Sélection Joueur */}
                <div style={{ gridColumn: 'span 2' }}>
                    <label>Joueur : </label>
                    <select 
                        value={selectedPlayer} 
                        onChange={(e) => setSelectedPlayer(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="">-- Choisir un joueur --</option>
                        {players.map(p => <option key={p._id} value={p._id}>{p.name} ({p.position})</option>)}
                    </select>
                </div>

                {/* Sélection Match */}
                <div style={{ gridColumn: 'span 2' }}>
                    <label>Match : </label>
                    <select 
                        value={selectedMatch} 
                        onChange={(e) => setSelectedMatch(e.target.value)}
                        style={{ width: '100%', padding: '8px' }}
                    >
                        <option value="">-- Choisir un match --</option>
                        {matches.map(m => <option key={m._id} value={m._id}>{m.name} vs {m.opponent}</option>)}
                    </select>
                </div>

                {/* Champs numériques */}
                <div>
                    <label>Buts :</label>
                    <input type="number" value={goals} onChange={e => setGoals(e.target.value)} style={{ width: '100%' }} />
                </div>
                <div>
                    <label>Passes D. :</label>
                    <input type="number" value={assists} onChange={e => setAssists(e.target.value)} style={{ width: '100%' }} />
                </div>
                <div>
                    <label>Minutes :</label>
                    <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} style={{ width: '100%' }} />
                </div>
                <div>
                    <label>Note (1-10) :</label>
                    <input type="number" step="0.1" max="10" value={rating} onChange={e => setRating(e.target.value)} style={{ width: '100%' }} />
                </div>

                <button type="submit" style={{ gridColumn: 'span 2', padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Enregistrer la Stat
                </button>
            </form>
            
            {message && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{message}</p>}
        </div>
    );
}

export default StatForm;