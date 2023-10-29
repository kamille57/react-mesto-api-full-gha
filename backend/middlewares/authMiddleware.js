const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const authMiddleware = async (req, res, next) => {
  let payload;
  try {
    const token = req.cookies.jwt;
    // const { authorization } = req.headers;
    // if (!authorization.startsWith('Bearer')) {
    //   throw new UnauthorizedError('Токен не получен');
    // }
    // const token = authorization.split('Bearer ')[1];

    if (!token) {
      throw new UnauthorizedError('Токен не получен');
    }

    const validToken = token.replace('Bearer ', '');
    payload = jwt.verify(validToken, 'secret_code');
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
