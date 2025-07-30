
const { getAllCategories } = require('../models/index');


const getCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json({
            message: 'Catégories récupérées avec succès.',
            categories,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

module.exports = {
    getCategories,
};