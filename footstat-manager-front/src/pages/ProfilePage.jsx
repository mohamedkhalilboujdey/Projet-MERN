import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfileByUserId, updateProfile } from '../services/profileService';

function ProfilePage() {
    const { user, loading: authLoading } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState('');

    useEffect(() => {
        if (user && user.id) {
            const fetchProfile = async () => {
                try {
                    // Lecture du profil via l'ID utilisateur
                    const data = await getProfileByUserId(user.id); 
                    setProfile(data);
                    setBio(data.bio || ''); // Initialiser la bio pour l'édition
                } catch (err) {
                    // Si le profil n'existe pas (404), on laisse 'profile' à null 
                    // pour suggérer la création.
                    setError(err.response?.status === 404 ? "Le profil n'existe pas. Créez-le !" : 'Erreur de chargement.');
                    setProfile(null);
                } finally {
                    setLoading(false);
                }
            };
            fetchProfile();
        }
    }, [user, authLoading]);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            // Mise à jour du profil (utilise la route POST/UPSERT)
            const updated = await updateProfile(user.id, { bio });
            setProfile(updated);
            setIsEditing(false);
            alert("Profil mis à jour !");
        } catch (err) {
            alert('Échec de la sauvegarde du profil.');
        }
    };

    if (authLoading || loading) return <h2>Chargement du Profil...</h2>;
    
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>Mon Profil Manager</h1>
            
            <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
                <p><strong>Nom d'utilisateur:</strong> {user.username || 'N/A'}</p>
                <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                <p><strong>Rôle:</strong> {user.role || 'user'}</p>
                <hr />
                
                <h3>Bio et Description</h3>
                
                {error && <p style={{color: 'orange'}}>{error}</p>}

                {isEditing ? (
                    <form onSubmit={handleSave}>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows="4"
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <button type="submit" style={{ marginRight: '10px' }}>Sauvegarder</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
                    </form>
                ) : (
                    <>
                        <p>{profile?.bio || 'Aucune biographie fournie.'}</p>
                        <button onClick={() => setIsEditing(true)}>Modifier la Bio</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;