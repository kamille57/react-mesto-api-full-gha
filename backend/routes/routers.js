const express = require('express');

const router = express.Router();

router.use(express.json());

const auth = require('./auth');
const authMiddleware = require('../middlewares/authMiddleware');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use(auth);
router.use(authMiddleware);
router.use(usersRouter);
router.use(cardsRouter);

module.exports = router;
