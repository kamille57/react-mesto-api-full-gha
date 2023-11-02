const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { NotFoundError } = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes/routers');
const {
  errorsHandler,
} = require('./middlewares/errorsHandler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001', 'kamille57.nomoredomainsrocks.ru', 'api.kamille57.nomoredomainsrocks.ru'], credentials: true }));
app.use(requestLogger);
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
