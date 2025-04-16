const { User } = require('../models');
const authService = require('../services/authService');

exports.signup = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const existing = await User.findOne({ where: { email } });
        if (existing) return res.status(400).json({ error: 'Email already registered' });

        const passwordHash = await authService.hashPassword(password);
        const user = await User.create({ email, name, passwordHash });

        const token = authService.generateToken(user);
        res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Signup failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await authService.comparePasswords(password, user.passwordHash))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = authService.generateToken(user);
        res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
    }
};