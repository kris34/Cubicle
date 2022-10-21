const hotelController = require('express').Router();

hotelController.get('/:id/details', (req, res) => {
  res.render('details', {
    title: 'Details',
  });
});

hotelController.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create',
  });
});

hotelController.get('/:id/edit', (req, res) => {
  res.render('edit', {
    title: 'Edit Hotel',
  });
});

module.exports = hotelController;
