const router = require('express').Router();
const dayjs = require('dayjs');
const withAuth = require('../utils/auth');
const {User, Pet, Appointment} = require("../models")

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
  const user_id = req.session.userId;
  if (!user_id) {
    return res.redirect('/signin');
  }
  try {
    const now = dayjs().format('YYYY-MM-DD');
    const petData = await Pet.findByPk(req.params.pet_id);
    if (!petData) {
      console.log('No Dice');
      return res.render('404', {
        loggedIn: req.session.loggedIn
      })
    }
    const pet = petData.get({ plain: true });
    // const pet = petData ? petData.get({ plain: true }) : null;
    res.render('appointment', {
      now, pet, loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/user', async (req, res) => {
  const loggedIn = req.session.loggedIn || false;
  let userInfo = {};
  let appointments = [];
  let speciesPreference;

  if (loggedIn) {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] }
    });

    if (userData) {
      userInfo = userData.get({ plain: true });

      const rawAppointments = await Appointment.findAll({
        where: { user_id: req.session.userId },
        include: [{
          model: Pet,
          as: 'Pet',
          attributes: ['name']
        }]
      }).catch(err => console.log(err));

      if (rawAppointments) {
        appointments = rawAppointments.map(appointment => {
          const appointmentData = appointment.get({ plain: true });
          const petName = appointmentData.Pet ? appointmentData.Pet.name : 'Unknown';
          return {
            ...appointmentData,
            petName,
          };
        });
      }
    }
  }

  const speciesPreferencesMap = {
    1: "Dogs",
    2: "Cats",
    3: "Birds",
    4: "Rodents",
    5: "All"
  };
  speciesPreference = speciesPreferencesMap[userInfo.species] || "All";

  const allergyMap = {
    true: "Hypoallergenic Only",
    false: "No Allergies"
  };
  const allergyPreference = allergyMap[userInfo.hypoallergenic] || "No Allergies";

  const kidsMap = {
    true: "Yes",
    false: "No"
  };
  const kidsPreference = kidsMap[userInfo.kids_status] || "No";

  res.render('profile', {
    userId: req.session.userId,
    email: userInfo.email || '',
    appointments: appointments || null,
    species_preference: speciesPreference || 'None',
    allergy_preference: allergyPreference || 'None',
    kids_preference: kidsPreference || 'None',
    loggedIn
  });
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

router.get('/success', async (req, res) => {
  const user_id = req.session.userId;
  if (!user_id) {
    return res.redirect('/signin');
  }
  try {
    const apptData = await Appointment.findOne({
      where: {
        user_id: user_id,
      },
      include: [Pet],
      order: [ [ 'createdAt', 'DESC' ]]
    });
    console.log('apptData:', apptData);
    if (!apptData) {
      console.log('No Go');
      return res.render('404', {
        loggedIn: req.session.loggedIn
      })
    }

    const appt = apptData.get({ plain: true});
    // console.log('appt 1:', appt);
    console.log('appt.date', appt.date)
    appt.date = appt.date.toDateString();
    console.log('appt 2:', appt);
    res.render('success', {
      appt, loggedIn: req.session.loggedIn
    })

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;