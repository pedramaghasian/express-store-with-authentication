const express = require('express');
const router = express.Router();
const homeRouter = require('./home');
const contactRouter = require('./contact');
const aboutRouter = require('./about');
const carRouter = require('./car');
const authRouter = require('./auth');
const rootRouter = require('./root');
const userRouter = require('./user');
const isAuth = require('app/http/middleware/isAuth').isauth;

router.use('/', rootRouter);
router.use('/home', isAuth, homeRouter);
router.use('/contact', isAuth, contactRouter);
router.use('/about', isAuth, aboutRouter);
router.use('/car', isAuth, carRouter);
router.use('/auth', authRouter);
router.use('/user', isAuth, userRouter);

module.exports = router;
