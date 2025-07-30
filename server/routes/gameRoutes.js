const express = require('express');
const { startNewRound } = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/start-round', protect, startNewRound);

module.exports = router;