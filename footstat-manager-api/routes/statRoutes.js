const express = require('express');
const router = express.Router();
const { protect } = require('../moddleware/authMiddleware');
const { 
    createStat,
    getStats,
    getPlayerAnalysis,
    updateStat,
    deleteStat,
} = require('../controllers/statController');

router.route('/')
    .post(protect,createStat) 
    .get(getStats); 

router.route('/:id')
    .put(protect,updateStat) 
    .delete(protect,deleteStat); 
router.get('/analysis/:playerId', getPlayerAnalysis); 

module.exports = router;