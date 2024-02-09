const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('home')
});

router.get('/meet', (req, res) => {
  res.render('meet');
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

module.exports = router;