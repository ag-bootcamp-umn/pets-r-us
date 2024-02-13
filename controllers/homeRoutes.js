const router = require('express').Router();
const dayjs = require('dayjs');
const { Pet } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('home')
});

router.get('/meet', (req, res) => {
  res.render('appointment');
})

router.get('/meet/1', async (req, res) => {
  try {
    const now = dayjs().format('YYYY-MM-DD');
    const petData = await Pet.findByPk(1);
    const pet = petData ? petData.get({ plain: true }) : null;
    res.render('appointment', {
      now, pet,
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
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