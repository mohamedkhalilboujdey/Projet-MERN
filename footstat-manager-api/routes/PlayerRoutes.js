const express = require('express');
const router = express.Router(); 
const { protect } = require('../moddleware/authMiddleware');

const { 
    getPlayers,
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer,
} = require('../controllers/playerController');


router.route('/')
    .get(getPlayers) 
    .post(protect, createPlayer); 

router.route('/:id')
    .get(getPlayer) 
    .put(protect, updatePlayer)
    .delete(protect, deletePlayer); 

module.exports = router;