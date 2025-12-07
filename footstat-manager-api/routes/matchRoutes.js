const express = require('express');
const router = express.Router();
const { protect } = require('../moddleware/authMiddleware');
const {
    getMatches,
    getMatch,
    createMatch,
    updateMatch,
    deleteMatch
} = require('../controllers/matchController');

router.route('/')
    .get(getMatches) 
    .post(protect,createMatch); 

router.route('/:id')
    .get(getMatch) 
    .put(protect,updateMatch) 
    .delete(protect,deleteMatch); 

module.exports = router;