const pool = require('../config/db');

const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(query);
        console.log('"Users" table created');
    } catch (err) {
        console.error('Error while creating table "users":', err);
        process.exit(1);
    }
};


const findUserByUsername = async (username) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0] || null;
    } catch (err) {
        console.error('Error while looking for a user by his username:', err);
        throw err;
    }
};

const createUser = async (username, email, password) => {
    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at',
            [username, email, password]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error while creating a User:', err);
        throw err;
    }
};


module.exports = {
    createUsersTable,
    findUserByUsername,
    createUser
};