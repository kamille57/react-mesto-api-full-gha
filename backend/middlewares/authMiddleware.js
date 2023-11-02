require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret_code';
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const authMiddleware = async (req, res, next) => {
  let payload;
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new UnauthorizedError('Токен не получен');
    }

    const validToken = token.replace('Bearer ', '');
    payload = jwt.verify(validToken, jwtSecret);
  } catch (error) {
    let errorMessage = 'Ошибка авторизации';
    if (error.name === 'JsonWebTokenError') {
      errorMessage = 'Проблема с токеном или требуется авторизация';
    }
    return next(new UnauthorizedError(errorMessage));
  }
  req.user = payload;
  return next();
};

module.exports = authMiddleware;
