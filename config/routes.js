const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const hotelController = require('../controllers/hotel');
const profileController = require('../controllers/profile');
const { hasUser } = require('../middlewares/guards');

module.exports = (app) => {
  app.use('/', homeController);
  app.use('/auth', authController);
  app.use('/hotel', hasUser(), hotelController);
  app.use('/profile', profileController);
};
