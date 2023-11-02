const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { NotFoundError } = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/routers');
const {
  errorsHandler,
} = require('./middlewares/errorsHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'https://kamille57.nomoredomainsrocks.ru', 'https://api.kamille57.nomoredomainsrocks.ru'], credentials: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(router);
app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
