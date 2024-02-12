const router = require('express').Router();
const dayjs = require('dayjs');
const { Pet } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('home')
});

router.get('/meet/:pet_id', async (req, res) => {
  try {
    const now = dayjs().format('YYYY-MM-DD');
    const petData = await Pet.findByPk(req.params.pet_id);
    const pet = petData.get({ plain: true });
    res.render('appointment', {
      ...pet, now
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/pets', (req, res) => {
  res.render('petprofiles')
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

router.get('/new-login',(req, res) => {
  res.render('new-login');
});

module.exports = router;