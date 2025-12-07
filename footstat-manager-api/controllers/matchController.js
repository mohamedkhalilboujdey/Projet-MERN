const asyncHandler = require('express-async-handler');
const Match = require('../models/Match');


const getMatches = asyncHandler(async (req, res) => {
    const matches = await Match.find().sort({ date: -1 }); 
    res.status(200).json(matches);
});


const getMatch = asyncHandler(async (req, res) => {
    const match = await Match.findById(req.params.id);

    if (!match) {
        res.status(404);
        throw new Error('Match non trouvé.');
    }

    res.status(200).json(match);
});


const createMatch = asyncHandler(async (req, res) => {
    const match = await Match.create(req.body);
    res.status(201).json(match);
});


const updateMatch = asyncHandler(async (req, res) => {
    const updatedMatch = await Match.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true } 
    );

    if (!updatedMatch) {
        res.status(404);
        throw new Error('Match non trouvé pour la mise à jour.');
    }

    res.status(200).json(updatedMatch);
});


const deleteMatch = asyncHandler(async (req, res) => {
    const deletedMatch = await Match.findByIdAndDelete(req.params.id);

    if (!deletedMatch) {
        res.status(404);
        throw new Error('Match non trouvé pour la suppression.');
    }

    res.status(200).json({ message: `Match supprimé avec succès.`, id: req.params.id });
});


module.exports = {
    getMatches,
    getMatch,
    createMatch,
    updateMatch,
    deleteMatch
};