const jwt = require('jsonwebtoken');

// Fonction pour signer un token avec l'ID de l'utilisateur
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE, // Durée de validité définie dans .env
    });
};

module.exports = generateToken;