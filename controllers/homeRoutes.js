const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
  res.render('home')
});

router.get('/meet', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/signin');
    return;
  }
  res.render('signup');
});

router.get('/signin', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signin');
});

router.get('/signup',(req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});


module.exports = router;