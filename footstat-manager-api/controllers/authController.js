const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken'); 

// @desc    Inscription (Créer un nouvel utilisateur)
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // 1. Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400); // Bad Request
        throw new Error('Un utilisateur avec cet email existe déjà.');
    }

    // 2. Créer l'utilisateur (le mot de passe est haché via le middleware 'pre' du modèle)
    const user = await User.create({ username, email, password });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id), // Génère le token
        });
    } else {
        res.status(400);
        throw new Error('Données utilisateur invalides.');
    }
});

// @desc    Connexion (Authentifier l'utilisateur)
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Trouver l'utilisateur
    const user = await User.findOne({ email });

    // 2. Vérifier si l'utilisateur existe ET si le mot de passe est correct (méthode du modèle)
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id), // Génère le token
        });
    } else {
        res.status(401); // Unauthorized
        throw new Error('Email ou mot de passe invalide.');
    }
});

// @desc    Récupérer tous les utilisateurs (pour le CRUD Read All)
// @route   GET /api/auth/users
// @access  Private (sera protégé par JWT)
const getUsers = asyncHandler(async (req, res) => {
    // .select('-password') exclut le hash de la réponse pour la sécurité
    const users = await User.find().select('-password'); 
    res.status(200).json(users);
});


module.exports = { registerUser, loginUser, getUsers };