const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// New Account
router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;

      res.status(200).json({ user: dbUserData, userId: dbUserData.id });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Modify Account
router.put('/signup/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const [updatedRows] = await User.update({
      species: req.body.species,
      hypoallergenic: req.body.hypoallergenic,
      kidsStatus: req.body.kidsStatus,
    }, {
      where: { id: userId },
    });

    if (updatedRows > 0) {
      const dbUserData = await User.findByPk(userId);
      if (dbUserData) {
        res.status(200).json({ user: dbUserData });
      } else {
        res.status(404).json({ message: "Ruh Roh!  No user, Raggy." });
      }
    } else {
      res.status(404).json({ message: "Ruh Roh!  No user ID, Raggy." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Ruh Roh!  Wrong email or password, Raggy.' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Ruh Roh!  Wrong email or password, Raggy.' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log(
        'File: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;