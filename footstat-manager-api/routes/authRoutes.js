const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/authController');

// Routes de l'API: /api/auth

// POST /api/auth/register (Inscription)
// GET /api/auth/users (Lire tous les utilisateurs)
router.route('/register')
    .post(registerUser); 

router.route('/users')
    .get(getUsers);

// POST /api/auth/login (Connexion)
router.post('/login', loginUser); 

module.exports = router;