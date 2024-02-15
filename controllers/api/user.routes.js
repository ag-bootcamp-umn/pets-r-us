const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { deleteUserById } = require('../../utils/helpers');

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
        .json({ message: 'Ruh Roh!  Wrong email, Raggy.' });
        console.log('Email error.');
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Ruh Roh!  Wrong password, Raggy.' });
        console.log('Password error.');
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;
      console.log(
        'File: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
        console.log('Success!');
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

// Delete
router.delete('/delete', (req, res) => {
  if (req.session.loggedIn) {
    const userId = req.session.userId;

    deleteUserById(userId)
      .then(() => {
        req.session.destroy((err) => {
          if (err) {
            console.error('Session destruction error:', err);
            res.status(500).send(`Ruh roh, Raggy.  Can't sign out.`);
          } else {
            res.status(204).end();
          }
        });
      })
      .catch((err) => {
        console.error('Database deletion error:', err);
        res.status(500).send(`Ruh roh, Raggy.  Can't delete account.`);
      });
  } else {
    res.status(404).end();
  }
});

module.exports = router;