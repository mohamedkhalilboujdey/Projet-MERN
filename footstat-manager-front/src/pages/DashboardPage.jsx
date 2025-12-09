import React, { useState, useEffect } from 'react';
import { getAllPerformanceStats, updatePerformanceStat } from '../services/playerService';
import StatForm from '../components/StatForm'; // 1. IMPORTATION DU FORMULAIRE

function DashboardPage() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Gestion de l'Édition ---
    const [editingId, setEditingId] = useState(null); // ID de la stat en cours de modification
    const [editFormData, setEditFormData] = useState({ goals: 0, rating: 0 });

    // 1. Chargement des données
    const fetchStats = async () => {
        try {
            const data = await getAllPerformanceStats();
            setStats(data);
        } catch (err) {
            setError('Impossible de charger les performances.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    // 2. Activer le mode édition pour une carte spécifique
    const handleEditClick = (stat) => {
        setEditingId(stat._id);
        setEditFormData({
            goals: stat.goals,
            rating: stat.rating
        });
    };

    // 3. Annuler l'édition
    const handleCancelClick = () => {
        setEditingId(null);
    };

    // 4. Sauvegarder les modifications (Appel API PUT)
    const handleSaveClick = async (statId) => {
        try {
            // Appel API
            await updatePerformanceStat(statId, editFormData);
            
            // Mise à jour locale de l'affichage (Optimistic UI)
            setStats(prevStats => prevStats.map(stat => {
                if (stat._id === statId) {
                    return { ...stat, ...editFormData };
                }
                return stat;
            }));
            
            setEditingId(null); // Quitter le mode édition
            alert("Statistique mise à jour !");
        } catch (err) {
            alert("Erreur lors de la mise à jour.");
        }
    };

    // Gestion des changements dans les inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };


    if (loading) return <h2 style={{ textAlign: 'center', padding: '50px' }}>Chargement...</h2>;
    if (error) return <h2 style={{ color: 'red', textAlign: 'center' }}>{error}</h2>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Gestion des Performances</h1>
            
            {/* 2. INTÉGRATION DU FORMULAIRE D'AJOUT ICI */}
            <div style={{marginBottom: '40px'}}>
                {/* On passe fetchStats pour recharger la liste après un ajout réussi */}
                <StatForm onStatAdded={fetchStats} /> 
            </div>
            <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '30px'}} />
            
            <h2 style={{marginBottom: '20px', color: '#444'}}>Historique des Matchs</h2>
            <div style={styles.statsGrid}>
                {stats.map(stat => (
                    <div key={stat._id} style={styles.statCard}>
                        {/* En-tête de la carte : Joueur et Match (Non modifiable) */}
                        <div style={styles.cardHeader}>
                            <h3 style={styles.playerName}>
                                {stat.player?.name || stat.player?.username || 'Joueur Inconnu'}
                            </h3>
                            <span style={styles.matchInfo}>
                                vs. {stat.match?.opponent || 'Match Inconnu'}
                            </span>
                        </div>

                        {/* Corps de la carte : Affichage OU Formulaire */}
                        <div style={styles.cardBody}>
                            {editingId === stat._id ? (
                                // --- MODE ÉDITION (Formulaire) ---
                                <div style={styles.editForm}>
                                    <label>
                                        Buts:
                                        <input 
                                            type="number" 
                                            name="goals" 
                                            value={editFormData.goals} 
                                            onChange={handleChange} 
                                            style={styles.input}
                                        />
                                    </label>
                                    <label>
                                        Note:
                                        <input 
                                            type="number" 
                                            name="rating" 
                                            value={editFormData.rating} 
                                            onChange={handleChange} 
                                            step="0.1" max="10"
                                            style={styles.input}
                                        />
                                    </label>
                                    <div style={styles.actions}>
                                        <button onClick={() => handleSaveClick(stat._id)} style={styles.saveBtn}>Sauvegarder</button>
                                        <button onClick={handleCancelClick} style={styles.cancelBtn}>Annuler</button>
                                    </div>
                                </div>
                            ) : (
                                // --- MODE LECTURE (Affichage) ---
                                <>
                                    <p style={styles.statValue}>Buts: <strong>{stat.goals}</strong></p>
                                    <p style={styles.statValue}>Note: <strong>{stat.rating}/10</strong></p>
                                    <button onClick={() => handleEditClick(stat)} style={styles.editBtn}>
                                        Modifier
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {stats.length === 0 && <p style={styles.empty}>Aucune performance enregistrée.</p>}
        </div>
    );
}

const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '20px' },
    title: { textAlign: 'center', marginBottom: '30px', color: '#1f2937' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
    statCard: { border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' },
    cardHeader: { backgroundColor: '#f3f4f6', padding: '15px', borderBottom: '1px solid #e5e7eb' },
    playerName: { margin: 0, color: '#3b82f6', fontSize: '1.2rem' },
    matchInfo: { fontSize: '0.9rem', color: '#6b7280' },
    cardBody: { padding: '20px' },
    statValue: { fontSize: '1.1rem', margin: '10px 0' },
    
    // Styles pour les boutons et inputs
    editBtn: { backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '10px' },
    saveBtn: { backgroundColor: '#10b981', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' },
    cancelBtn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' },
    editForm: { display: 'flex', flexDirection: 'column', gap: '10px' },
    input: { padding: '5px', borderRadius: '4px', border: '1px solid #ccc', marginLeft: '10px', width: '60px' },
    actions: { marginTop: '15px', display: 'flex', justifyContent: 'flex-end' },
    empty: { textAlign: 'center', color: '#999', marginTop: '50px' }
};

export default DashboardPage;