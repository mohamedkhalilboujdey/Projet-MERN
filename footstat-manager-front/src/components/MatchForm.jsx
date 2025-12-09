import React, { useState } from 'react';

function MatchForm({ onAddMatch }) {
    // States pour les inputs contrôlés
    const [name, setName] = useState('');
    const [opponent, setOpponent] = useState('');
    const [date, setDate] = useState('');
    const [score, setScore] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!name || !opponent || !date) {
            setError("Veuillez remplir le nom, l'adversaire et la date.");
            return;
        }

        const matchData = {
            name,
            opponent,
            date,
            score,
        };

        setIsSubmitting(true);
        try {
            // Appel de la fonction parente (qui appelle le service API)
            const success = await onAddMatch(matchData);
            
            if (success) {
                // Réinitialisation du formulaire après succès
                setName('');
                setOpponent('');
                setDate('');
                setScore('');
            } else {
                 // Si onAddMatch retourne false (suite à une erreur API)
                setError("Échec de l'ajout. Vérifiez les données ou le token.");
            }
        } catch (err) {
            // Cette erreur est généralement attrapée par le handler parent, mais on la logue ici.
            setError("Erreur réseau lors de l'ajout.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.formContainer}>
            <h3>Ajouter un nouveau Match</h3>
            {error && <p style={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} style={styles.formGrid}>
                
                <input
                    type="text"
                    placeholder="Nom du Match (ex: Journée 1)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                    required
                />
                
                <input
                    type="text"
                    placeholder="Adversaire"
                    value={opponent}
                    onChange={(e) => setOpponent(e.target.value)}
                    style={styles.input}
                    required
                />
                
                {/* Utilisation de type="date" ou "datetime-local" pour la date */}
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={styles.input}
                    required
                />
                
                <input
                    type="text"
                    placeholder="Score (ex: 3-1, optionnel)"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    style={styles.input}
                />
                
                <button
                    type="submit"
                    style={styles.button}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Ajout en cours...' : 'Publier le Match'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    formContainer: {
        backgroundColor: '#f9fafb', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '30px', 
        border: '1px solid #eee'
    },
    formGrid: {
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: '10px',
        alignItems: 'center'
    },
    input: {
        padding: '10px', 
        borderRadius: '4px', 
        border: '1px solid #ddd'
    },
    button: {
        padding: '10px 15px', 
        backgroundColor: '#10b981', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer'
    },
    error: {
        color: 'red',
        marginBottom: '10px'
    }
};

export default MatchForm;