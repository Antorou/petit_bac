const { getRandomLetter } = require('../utils/gameUtils');
const { getAllCategories } = require('../models/index');

const startNewRound = async (req, res) => {
    try {
        const randomLetter = getRandomLetter();
        const categories = await getAllCategories(); 

        res.status(200).json({
            message: 'Nouveau tour démarré.',
            letter: randomLetter,
            categories: categories.map(cat => cat.name)
        });

    } catch (error) {
        console.error('Erreur lors du démarrage d\'un nouveau tour:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

module.exports = {
    startNewRound,
};