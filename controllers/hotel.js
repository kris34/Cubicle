const Hotel = require('../models/Hotel');
const { getById, update } = require('../services/hotelService');
const { parseError } = require('../util/parser');

const hotelController = require('express').Router();

hotelController.get('/:id/details', async (req, res) => {
  const hotel = await getById(req.params.id);

  if (hotel.owner == req.user._id) {
    hotel.isOwner = true;
  } 

  res.render('details', {
    title: 'Details',
    hotel,
  });
});

hotelController.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create',
  });
});

hotelController.post('/create', async (req, res) => {
  const hotel = {
    name: req.body.name,
    city: req.body.city,
    imageUrl: req.body.imageUrl,
    rooms: Number(req.body.rooms),
    owner: req.user._id,
  };

  try {
    await Hotel.create(hotel);

    if (Object.values(hotel).some((v) => !v)) {
      throw new Error('All fields are required!');
    }

    res.redirect('/');
  } catch (err) {
    res.render('create', {
      title: 'Create',
      body: hotel,
      errors: parseError(err),
    });
  }
});

hotelController.get('/:id/edit', async (req, res) => {
  const hotel = await getById(req.params.id);

  if (hotel.owner != req.user._id) {
    res.redirect('/auth/login');
  }

  res.render('edit', {
    title: 'Edit Hotel',
    hotel,
  });
});

hotelController.post('/:id/edit', async (req, res) => {
  const hotel = await getById(req.params.id);

  if (hotel.owner != req.user._id) {
    res.redirect('/auth/login');
  }

  const edited = {
    name: req.body.name,
    city: req.body.city,
    imageUrl: req.body.imageUrl,
    rooms: Number(req.body.rooms),
  };

  try {
    if (Object.values(edited).some((v) => !v)) {
      throw new Error('All fields are required!');
    }

    await update(req.params.id, edited);
    res.redirect(`/hotel/${req.params.id}/details`);
  } catch (err) {
    res.render('edit', {
      title: 'Edit Hotel',
      body: Object.assign(edited, { _id: req.params.id }),
      errors: parseError(err),
    });
  }
});

module.exports = hotelController;
