const express = require('express');
const router = express.Router();
const { protect } = require('../moddleware/authMiddleware');
const {
    createOrUpdateProfile,
    getProfileByUserId,
    deleteProfile
} = require('../controllers/profileController');

// Chemin pour cibler le profil d'un utilisateur spécifique
router.route('/user/:userId')
    .post(protect,createOrUpdateProfile) // POST (Créer/Mettre à jour)
    .get(getProfileByUserId) // GET (Lire)
    .delete(protect,deleteProfile); // DELETE (Supprimer)

module.exports = router;