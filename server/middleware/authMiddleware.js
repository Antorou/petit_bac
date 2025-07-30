const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = { id: decoded.id };

            next();

        } catch (error) {
            console.error('auth error - invalid token :', error.message);
            return res.status(401).json({ message: 'unauthorized - invalid token' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'unauthorized - invalid token' });
    }
};

module.exports = { protect };