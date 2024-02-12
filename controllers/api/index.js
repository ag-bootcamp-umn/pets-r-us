const router = require('express').Router();
const userRoutes = require('./user.routes');
const appointments = require('./appointment.routes');

router.use('/users', userRoutes);
router.use('/meet', appointments);

router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;