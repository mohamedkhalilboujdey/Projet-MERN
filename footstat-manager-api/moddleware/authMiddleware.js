const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Vérifier si le token est présent dans l'en-tête Authorization [cite: 956]
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Le token est au format "Bearer <token>" [cite: 956]
            token = req.headers.authorization.split(' ')[1];

            // 2. Vérifier la signature du token avec la clé secrète du serveur [cite: 957]
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Récupérer l'utilisateur (sans le hash du mot de passe) et l'attacher à la requête
            req.user = await User.findById(decoded.id).select('-password');

            // 4. Passer au contrôleur suivant
            next();
        } catch (error) {
            console.error('Erreur de validation du token:', error);
            res.status(401); // Unauthorized
            throw new Error('Non autorisé, token invalide ou expiré.');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Non autorisé, aucun token fourni.');
    }
});

// Le middleware admin sera appliqué si vous voulez restreindre des routes aux administrateurs
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403); // Forbidden
        throw new Error('Non autorisé en tant qu\'administrateur.');
    }
};

module.exports = { protect, admin };