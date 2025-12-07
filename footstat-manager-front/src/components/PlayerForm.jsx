import React, { useState } from 'react';

function PlayerForm({ onAddPlayer }) {
    // State pour les inputs contrôlés
    const [name, setName] = useState('');
    const [position, setPosition] = useState('Attaquant');
    const [team, setTeam] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (!name || !team) {
            alert('Veuillez remplir le nom et l\'équipe.');
            return;
        }

        const newPlayer = {
            id: Date.now(), // ID temporaire pour la démo
            name,
            position,
            team,
            goals: 0, 
            rating: 'N/A'
        };

        onAddPlayer(newPlayer); // Appel de la fonction du parent
        
        // Réinitialisation du formulaire
        setName('');
        setTeam('');
        setPosition('Attaquant');
    };

    return (
        <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #eee' }}>
            <h2>Ajouter un nouveau joueur</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '15px' }}>
                
                {/* Input Contrôlé: name */}
                <input
                    type="text"
                    placeholder="Nom du joueur"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                />

                {/* Input Contrôlé: team */}
                <input
                    type="text"
                    placeholder="Équipe actuelle"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                />

                {/* Select Contrôlé: position */}
                <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                >
                    <option value="Attaquant">Attaquant</option>
                    <option value="Milieu">Milieu</option>
                    <option value="Défenseur">Défenseur</option>
                    <option value="Gardien">Gardien</option>
                </select>

                <button
                    type="submit"
                    style={{ padding: '10px 15px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Ajouter
                </button>
            </form>
        </div>
    );
}

export default PlayerForm;