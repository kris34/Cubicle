const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const hotelController = require('../controllers/hotel');
const profileController = require('../controllers/profile');

module.exports = (app) => {
  app.use('/', homeController);
  app.use('/auth', authController);
  app.use('/hotel', hotelController);
  app.use('/profile', profileController);
};
