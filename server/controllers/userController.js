const pool = require('../config/db');

const getMe = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = $1', [userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'user not found' });
        }

        res.status(200).json({
            message: 'success.',
            user: result.rows[0],
        });

    } catch (error) {
        console.error('Error while getting user infos:', error);
        res.status(500).json({ message: 'server error.' });
    }
};

module.exports = {
    getMe,
};