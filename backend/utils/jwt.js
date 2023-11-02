require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret_code';

const generateToken = (payload) => jwt.sign(payload, jwtSecret, { expiresIn: '7d' });

module.exports = generateToken;
