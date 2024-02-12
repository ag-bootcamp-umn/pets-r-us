const router = require('express').Router();
const dayjs = require('dayjs');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('home')
});

router.get('/meet', (req, res) => {
  const now = dayjs().format('YYYY-MM-DD');

  res.render('appointment', {now});
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

router.get('/submit-your-login-form',(req, res) => {
  res.render('new-login');
});

module.exports = router;