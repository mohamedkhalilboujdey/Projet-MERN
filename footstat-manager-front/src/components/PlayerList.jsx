import React from 'react';

function PlayerList({ players, onDeletePlayer }) {
    if (players.length === 0) {
        return <p style={{ textAlign: 'center', color: '#666', padding: '30px' }}>Aucun joueur enregistré.</p>;
    }

    return (
        <div>
            {/* Itération sur le tableau avec .map() et utilisation de la prop key */}
            {players.map(player => (
                <div 
                    key={player.id} // Clé obligatoire pour la performance des listes [cite: 573, 1639]
                    style={{ 
                        border: '1px solid #ddd', 
                        padding: '15px', 
                        marginBottom: '15px', 
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <div>
                        <h3>{player.name} <span style={{ fontSize: '0.8em', color: '#888' }}>({player.position})</span></h3>
                        <p style={{ margin: 0 }}>Équipe: **{player.team}** | Goals: **{player.goals}** | Rating: **{player.rating}**</p>
                    </div>

                    {/* Bouton de suppression qui appelle le handler parent */}
                    <button 
                        onClick={() => onDeletePlayer(player.id)} // L'enfant appelle la fonction du parent pour modifier le state [cite: 2919]
                        style={{ 
                            backgroundColor: '#ef4444', 
                            color: 'white', 
                            padding: '8px 12px', 
                            border: 'none', 
                            borderRadius: '4px', 
                            cursor: 'pointer' 
                        }}>
                        Supprimer
                    </button>
                </div>
            ))}
        </div>
    );
}
export default PlayerList;