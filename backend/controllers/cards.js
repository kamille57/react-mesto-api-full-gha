/* eslint-disable no-console */
/* eslint-disable consistent-return */
const Card = require('../models/card');
const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/Forbidden');

// Получить все карточки
module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find();
    if (!cards) {
      throw new NotFoundError('Карточки не найдены');
    }
    res.status(200).send(cards);
  } catch (error) {
    next(error);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: req.user.id });
    return res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Неверный ID карточки'));
    }
    return next(err);
  }
};

// Удалить карточку
module.exports.deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }

    if (card.owner.toString() !== req.user.id) {
      throw new ForbiddenError('Недостаточно прав для удаления карточки');
    }

    await Card.findByIdAndDelete(cardId);
    return res.status(200).json({ message: 'Карточка удалена' });
  } catch (error) {
    next(error);
  }
};

const updateLike = async (req, res, next, method) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { [method]: { likes: req.user.id } },
      { new: true },
    ).orFail(new NotFoundError('Нет карточки по данному id'));

    res.send(card);
  } catch (error) {
    next(error);
  }
};

module.exports.likeCard = (req, res, next) => updateLike(req, res, next, '$addToSet');
module.exports.deleteLike = (req, res, next) => updateLike(req, res, next, '$pull');
