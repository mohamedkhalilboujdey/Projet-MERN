const asyncHandler = require('express-async-handler'); 
const Player = require('../models/Player'); 


const getPlayers = asyncHandler(async (req, res) => {
    const players = await Player.find(); 
    res.status(200).json(players); 
});


const getPlayer = asyncHandler(async (req, res) => {
    const player = await Player.findById(req.params.id); 

    if (!player) {
        res.status(404); 
        throw new Error('Joueur non trouvé.'); 
    }

    res.status(200).json(player);
});


const createPlayer = asyncHandler(async (req, res) => {
    
    const player = await Player.create({...req.body,user: req.user.id}); 
    res.status(201).json(player); 
});


const updatePlayer = asyncHandler(async (req, res) => {
    const updatedPlayer = await Player.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { 
            new: true, 
            runValidators: true 
        }
    );

    if (!updatedPlayer) {
        res.status(404);
        throw new Error('Joueur non trouvé pour la mise à jour.');
    }

    res.status(200).json(updatedPlayer);
});


const deletePlayer = asyncHandler(async (req, res) => {
    const deletedPlayer = await Player.findByIdAndDelete(req.params.id); 

    if (!deletedPlayer) {
        res.status(404);
        throw new Error('Joueur non trouvé pour la suppression.');
    }

    
    res.status(200).json({ message: `Joueur supprimé avec succès.`, id: req.params.id }); 
});

module.exports = {
    getPlayers,
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer,
};