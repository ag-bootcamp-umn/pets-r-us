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
    // const loggedIn = (req.session.loggedIn)? req.session.loggedIn : false;
    // let petData;
    // // non-logged in user
    // if (!loggedIn) {
    // petData = await Pet.findAll();
    // const pets = petData.map((pet) => pet.get({ plain: true }));
    // }
    // // Logged IN user
    // else {
    const userData = await User.findByPk(3, {attributes: { exclude: ['password'] }});
    const userInfo = userData.map((usr) => usr.get({ plain: true }));
    const petData = await Pet.findAll({
      where: { [Op.or]:[
        {species:userInfo.species},
        {hypoallergenic:userInfo.hypoallergenic},
        {kids_status:userInfo.kids_status}
      ]}});
    // }
    const pets = petData.map((pet) => pet.get({ plain: true }));
    //const pets_number = pets.length;
    res.render('petprofiles', { 
      //pets_number,
      pets, 
      //loggedIn
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