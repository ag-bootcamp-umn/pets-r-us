const router = require('express').Router();
const userRoutes = require('./user.routes');
const appointments = require('./appointment.routes');

router.use('/users', userRoutes);
router.use('/meet', appointments);

module.exports = router;