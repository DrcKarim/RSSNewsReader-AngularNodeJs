const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET; // Store in .env in production


exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

exports.comparePasswords = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

exports.generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
};