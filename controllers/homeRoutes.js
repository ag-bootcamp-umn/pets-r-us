const router = require('express').Router();
const dayjs = require('dayjs');
const withAuth = require('../utils/auth');
const {User, Pet} = require("../models")

router.get('/', (req, res) => {
  res.render('home', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/meet', (req, res) => {
  res.render('appointment', {
    loggedIn: req.session.loggedIn
  });
})

router.get('/meet/:pet_id', async (req, res) => {
  try {
    const now = dayjs().format('YYYY-MM-DD');
    const petData = await Pet.findByPk(req.params.pet_id);
    const pet = petData ? petData.get({ plain: true }) : null;
    res.render('appointment', {
      now, pet, loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/pets', async (req, res) => {
  
  try {
    const loggedIn = (req.session.loggedIn)? req.session.loggedIn : false;
    let petData;

    // non-logged in user
    if (!loggedIn) {
    petData = await Pet.findAll();
    const pets = petData.map((pet) => pet.get({ plain: true }));
    }

    // Logged IN user
    else {
    const userData = await User.findByPk(req.session.userId, {attributes: {exclude: ['password']}});
    const userInfo = userData.get({ plain: true });
    
    petData = await Pet.findAll({
      where: [
        {species:userInfo.species},
        {hypoallergenic:userInfo.hypoallergenic},
        {kids_status:userInfo.kids_status}
      ]});
    }
    const pets = petData.map((pet) => pet.get({ plain: true }));
    const pets_number = pets.length;
    res.render('petprofiles', { 
      pets_number,
      pets, 
      loggedIn
    });
  } catch (err) {
    res.status(500).json({error:err.message});
  }
});

router.get('/user', (req, res) => {
  res.render('profile', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/signup',(req, res) => {
  res.render('signup', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/signin',(req, res) => {
  res.render('signin', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/signout',(req, res) => {
  res.render('signout', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/new-login',(req, res) => {
  res.render('new-login', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/success',(req, res) => {
  res.render('success', {
    loggedIn: req.session.loggedIn
  });
});

module.exports = router;