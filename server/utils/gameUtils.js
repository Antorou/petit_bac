const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const PLAYABLE_LETTERS = LETTERS.filter(
    (letter) => !['X', 'Y'].includes(letter)
);

const getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * PLAYABLE_LETTERS.length);
    return PLAYABLE_LETTERS[randomIndex];
};

module.exports = {
    getRandomLetter,
    PLAYABLE_LETTERS // Exporté aussi si besoin pour affichage ou autre
};