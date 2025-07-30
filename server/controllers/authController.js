const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByUsername, createUser } = require('../models/user');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'enter every require fields' });
    }

    try {
        let user = await findUserByUsername(username);
        if (user) {
            return res.status(400).json({ message: 'username already taken.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await createUser(username, email, hashedPassword);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(201).json({
            message: 'User saved with success.',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            token,
        });

    } catch (error) {
        console.error('Erreur while saving user:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Please, enter a username or a password' });
    }

    try {
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(400).json({ message: 'wrong details' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'wrong details' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(200).json({
            message: 'connected.',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            token,
        });

    } catch (error) {
        console.error('error while connecting:', error);
        res.status(500).json({ message: 'server error.' });
    }
};

module.exports = {
    registerUser,
    loginUser,
};