const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/status', async (req, res) => {
    try {
        const dbResult = await pool.query('SELECT NOW() as now');
        res.status(200).json({
            status: 'ok',
            message: 'Server and database are up and running!',
            databaseTime: dbResult.rows[0].now
        });
    } catch (err) {
        console.error('error while checking the state:', err);
        res.status(500).json({
            status: 'error',
            message: 'Server or database error',
            error: err.message
        });
    }
});

module.exports = router;