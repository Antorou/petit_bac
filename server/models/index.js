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
        console.log('Table "users" vérifiée/créée avec succès.');
    } catch (err) {
        console.error('Erreur lors de la création de la table "users":', err);
        throw err;
    }
};


const createCategoriesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) UNIQUE NOT NULL,
            description TEXT
        );
    `;
    try {
        await pool.query(query);
        console.log('Table "categories" vérifiée/créée avec succès.');

        const countResult = await pool.query('SELECT COUNT(*) FROM categories');
        if (parseInt(countResult.rows[0].count) === 0) {
            const defaultCategories = [
                { name: 'Prénom', description: 'Un prénom (homme ou femme)' },
                { name: 'Ville', description: 'Nom de ville, pays, ou capitale' },
                { name: 'Animal', description: 'Nom d\'un animal' },
                { name: 'Fruit ou Légume', description: 'Nom d\'un fruit ou d\'un légume' },
                { name: 'Métier', description: 'Nom d\'un métier' },
                { name: 'Objet', description: 'Nom d\'un objet courant' },
                { name: 'Célébrité', description: 'Nom d\'une personne célèbre' },
                { name: 'Marque', description: 'Nom d\'une marque' },
                { name: 'Sport', description: 'Nom d\'un sport ou discipline' },
                { name: 'Vêtement', description: 'Nom d\'un vêtement' }
            ];

            for (const cat of defaultCategories) {
                await pool.query('INSERT INTO categories (name, description) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING', [cat.name, cat.description]);
            }
            console.log('Catégories par défaut insérées.');
        }

    } catch (err) {
        console.error('Erreur lors de la création ou insertion dans la table "categories":', err);
        throw err;
    }
};


const initializeDatabase = async () => {
    try {
        await createUsersTable();
        await createCategoriesTable();
        console.log('Toutes les tables ont été vérifiées/créées.');
    } catch (error) {
        console.error('Échec de l\'initialisation de la base de données:', error);
        process.exit(1); // Arrête le serveur si la DB ne peut pas s'initialiser
    }
};


const findUserByUsername = async (username) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0] || null;
    } catch (err) {
        console.error('Erreur lors de la recherche de l\'utilisateur par nom d\'utilisateur:', err);
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
        console.error('Erreur lors de la création de l\'utilisateur:', err);
        throw err;
    }
};


const getAllCategories = async () => {
    try {
        const result = await pool.query('SELECT * FROM categories ORDER BY name');
        return result.rows;
    } catch (err) {
        console.error('Erreur lors de la récupération des catégories:', err);
        throw err;
    }
};

module.exports = {
    initializeDatabase,
    findUserByUsername,
    createUser,
    getAllCategories
};