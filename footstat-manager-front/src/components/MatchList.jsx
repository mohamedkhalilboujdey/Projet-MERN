import React from 'react';

function MatchList({ matches, onDeleteMatch }) {
    if (matches.length === 0) {
        return <p style={stylesList.noMatch}>Aucun match n'a été planifié ni joué.</p>;
    }
    
    // Fonction utilitaire pour formater la date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('fr-FR', {
            year: 'numeric', month: 'short', day: 'numeric', 
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div>
            {matches.map(match => (
                <div 
                    key={match._id} // Utilisation de l'_id de MongoDB
                    style={stylesList.matchCard}
                >
                    <div style={stylesList.matchDetails}>
                        <h4 style={stylesList.matchTitle}>{match.name}</h4>
                        <p style={stylesList.matchInfo}>
                            vs. <strong>{match.opponent}</strong> | 
                            Score: {match.score || 'N/A'}
                        </p>
                        <p style={stylesList.matchDate}>📅 {formatDate(match.date)}</p>
                    </div>

                    <button 
                        onClick={() => onDeleteMatch(match._id)}
                        style={stylesList.deleteButton}
                    >
                        Supprimer
                    </button>
                </div>
            ))}
        </div>
    );
}

const stylesList = {
    matchCard: {
        border: '1px solid #ddd', 
        padding: '15px', 
        marginBottom: '15px', 
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    matchDetails: {
        flexGrow: 1
    },
    matchTitle: {
        margin: '0 0 5px 0',
        color: '#3b82f6'
    },
    matchInfo: {
        margin: '0 0 5px 0',
        fontSize: '0.9em'
    },
    matchDate: {
        margin: 0,
        fontSize: '0.8em',
        color: '#666'
    },
    deleteButton: {
        backgroundColor: '#ef4444', 
        color: 'white', 
        padding: '8px 12px', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer',
        marginLeft: '20px'
    },
    noMatch: {
        textAlign: 'center',
        color: '#888',
        padding: '20px',
        border: '1px dashed #ccc'
    }
};

export default MatchList;