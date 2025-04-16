const jwt = require('jsonwebtoken');
// const SECRET = 'your_secret_key'; // move to .env in real apps
// const { JWT_SECRET } = require('../services/authService');
/*
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1]; // Expecting "Bearer <token>"

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded; // 🔥 this is what we use in controllers (req.user.id)
        console.log('User from token:', req.user);
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
} */

/*
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = decoded; // ⚠️ Make sure it's 'decoded', not 'user'
        console.log("User from token:", req.user);
        next();
    });
} */
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

console.log("outside function:");
function authenticateToken(req, res, next) {
    console.log("inside function:");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'No token provided' });

    console.log("Auth Header:", req.headers['authorization']);
    console.log("JWT_SECRET:", JWT_SECRET);

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = decoded;
        console.log("User from token:", req.user); // 🔥 This will now work!
        next();
    });
}

module.exports = authenticateToken;




/*const jwt = require('jsonwebtoken');
const SECRET = 'your_secret_key'; // move to .env in real apps


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user; // 🔥 this is what you need
        next();
    });
}

module.exports = authenticateToken;

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1]; // Expecting "Bearer <token>"

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

*/