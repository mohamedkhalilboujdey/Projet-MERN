import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api'; // On utilise api direct pour simplifier ici
import { getMatches } from '../services/matchService';
import { createStat } from '../services/statService';

function PlayerDetailsPage() {
    const { id } = useParams(); // ID du joueur
    const [player, setPlayer] = useState(null);
    const [matches, setMatches] = useState([]);
    const [statData, setStatData] = useState({ match: '', goals: 0, rating: 5, minutesPlayed: 90 });

    useEffect(() => {
        // Récupérer le joueur (nécessite une route GET /api/players/:id sur le back)
        api.get(`/players/${id}`).then(res => setPlayer(res.data));
        getMatches().then(setMatches);
    }, [id]);

    const handleAddStat = async (e) => {
        e.preventDefault();
        try {
            await createStat({ ...statData, player: id });
            alert('Performance ajoutée !');
        } catch (err) { alert('Erreur (Stat existe déjà pour ce match ?)'); }
    };

    if (!player) return <div>Chargement...</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{player.name}</h1>
            <p className="text-gray-600 mb-8">{player.position} - {player.team}</p>

            <div className="border p-6 rounded shadow-md bg-white max-w-lg">
                <h3 className="text-xl mb-4">Ajouter une Performance</h3>
                <form onSubmit={handleAddStat} className="flex flex-col gap-3">
                    <select className="border p-2" onChange={e => setStatData({...statData, match: e.target.value})} required>
                        <option value="">Sélectionner un match</option>
                        {matches.map(m => <option key={m._id} value={m._id}>{m.name} vs {m.opponent}</option>)}
                    </select>
                    <div className="flex gap-2">
                        <input type="number" placeholder="Buts" className="border p-2 w-1/2" onChange={e => setStatData({...statData, goals: e.target.value})} />
                        <input type="number" placeholder="Note (1-10)" className="border p-2 w-1/2" onChange={e => setStatData({...statData, rating: e.target.value})} />
                    </div>
                    <button className="bg-blue-600 text-white p-2 rounded">Enregistrer Stat</button>
                </form>
            </div>
        </div>
    );
}
export default PlayerDetailsPage;