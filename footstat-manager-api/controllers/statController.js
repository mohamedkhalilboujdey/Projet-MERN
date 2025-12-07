const asyncHandler = require('express-async-handler');
const PerformanceStat = require('../models/PerformanceStat');
const Player = require('../models/Player'); 

const createStat = asyncHandler(async (req, res) => {
    const { player, goals, assists, minutesPlayed, rating, matchDate } = req.body;

    
    if (!player || !minutesPlayed || !rating) {
        res.status(400);
        throw new Error('Veuillez fournir le joueur, les minutes jouées et la note.');
    }

    
    const existingPlayer = await Player.findById(player);
    if (!existingPlayer) {
        res.status(404);
        throw new Error(`Le joueur avec l'ID ${player} n'existe pas.`);
    }

    
    const stat = await PerformanceStat.create({
        player, 
        goals, 
        assists, 
        minutesPlayed, 
        rating,
        matchDate,
    });

    res.status(201).json(stat);
});


const getStats = asyncHandler(async (req, res) => {
    
    const filter = {};
    if (req.query.player) {
        filter.player = req.query.player;
    }

    
    const stats = await PerformanceStat.find(filter).populate('player');

    res.status(200).json(stats);
});


const getPlayerAnalysis = asyncHandler(async (req, res) => {
    const playerId = req.params.playerId;

    
    const existingPlayer = await Player.findById(playerId);
    if (!existingPlayer) {
        res.status(404);
        throw new Error(`Le joueur avec l'ID ${playerId} n'existe pas.`);
    }

    
    const analysis = await PerformanceStat.aggregate([
        { $match: { player: existingPlayer._id } }, 
        {
            $group: {
                _id: '$player', 
                totalMatches: { $count: {} }, 
                totalGoals: { $sum: '$goals' },
                totalAssists: { $sum: '$assists' },
                avgRating: { $avg: '$rating' },
                avgMinutes: { $avg: '$minutesPlayed' }
            }
        },
    ]);

    
    if (analysis.length === 0) {
        res.status(200).json({ player: existingPlayer.name, message: 'Aucune statistique disponible pour ce joueur.', analysis: analysis });
    } else {
        res.status(200).json({ 
            player: existingPlayer.name, 
            analysis: analysis[0] 
        });
    }
});
const updateStat = asyncHandler(async (req, res) => {
    const updatedStat = await PerformanceStat.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { 
            new: true, 
            runValidators: true 
        }
    );

    if (!updatedStat) {
        res.status(404);
        throw new Error('Statistique de performance non trouvée pour la mise à jour.');
    }

    res.status(200).json(updatedStat);
});
const deleteStat = asyncHandler(async (req, res) => {
    const deletedStat = await PerformanceStat.findByIdAndDelete(req.params.id);

    if (!deletedStat) {
        res.status(404);
        throw new Error('Statistique de performance non trouvée pour la suppression.');
    }

    res.status(200).json({ message: `Statistique supprimée avec succès.`, id: req.params.id }); 
});

module.exports = {
    createStat,
    getStats,
    getPlayerAnalysis,
    updateStat,
    deleteStat,
};