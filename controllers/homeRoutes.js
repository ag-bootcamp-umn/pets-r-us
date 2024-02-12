const router = require('express').Router();
const dayjs = require('dayjs');
const withAuth = require('../utils/auth');
const {User, Pet} = require("../models")

router.get('/', (req, res) => {
  res.render('home')
});

router.get('/meet', (req, res) => {
  const now = dayjs().format('YYYY-MM-DD');

  res.render('appointment', {now});
});

router.get('/pets', async (req, res) => {
  
  try {
    const petData = await Pet.findAll();

    // Serialize data so the template can read it
    const pets = petData.map((pet) => pet.get({ plain: true }));
    const pets_number = pets.length;

    // Pass serialized data and session flag into template
    res.render('petprofiles', { 
      pets_number,
      pets, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/user', (req, res) => {
  res.render('profile');
});

router.get('/signup',(req, res) => {
  res.render('signup');
});

router.get('/signin',(req, res) => {
  res.render('signin');
});

router.get('/submit-your-login-form',(req, res) => {
  res.render('new-login');
});

module.exports = router;