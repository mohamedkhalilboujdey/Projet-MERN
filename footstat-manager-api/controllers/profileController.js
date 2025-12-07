const asyncHandler = require('express-async-handler');
const Profile = require('../models/Profile');
const User = require('../models/User'); // Importé pour vérifier l'existence de l'utilisateur

// @desc    Créer ou mettre à jour le profil d'un utilisateur
// @route   POST /api/profiles/user/:userId
// @access  Private
const createOrUpdateProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    
    // Vérification de l'existence de l'utilisateur
    const userExists = await User.findById(userId);
    if (!userExists) {
        res.status(404);
        throw new Error('Utilisateur non trouvé. Impossible de créer le profil.');
    }
    
    const profileFields = {
        user: userId, 
        bio: req.body.bio,
        avatarURL: req.body.avatarURL,
    };

    // findOneAndUpdate avec upsert: true crée/met à jour le profil unique
    let profile = await Profile.findOneAndUpdate(
        { user: userId }, 
        { $set: profileFields },
        { new: true, upsert: true, runValidators: true } 
    );

    res.status(200).json(profile);
});

// @desc    Récupérer le profil par ID utilisateur
// @route   GET /api/profiles/user/:userId
// @access  Public
const getProfileByUserId = asyncHandler(async (req, res) => {
    // Utilisation de populate pour inclure les données de l'utilisateur
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user', ['username', 'email']);

    if (!profile) {
        res.status(404);
        throw new Error('Profil utilisateur non trouvé.');
    }

    res.status(200).json(profile);
});

// @desc    Supprimer un profil
// @route   DELETE /api/profiles/user/:userId
// @access  Private
const deleteProfile = asyncHandler(async (req, res) => {
    // Suppression basée sur la clé user: userId
    const profile = await Profile.findOneAndDelete({ user: req.params.userId });

    if (!profile) {
        res.status(404);
        throw new Error('Profil utilisateur non trouvé pour la suppression.');
    }

    res.status(200).json({ message: 'Profil supprimé avec succès.' });
});

module.exports = {
    createOrUpdateProfile,
    getProfileByUserId,
    deleteProfile
};