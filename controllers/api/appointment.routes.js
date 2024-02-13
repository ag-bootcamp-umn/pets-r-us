const router = require('express').Router();
const { Appointment } = require('../../models');

// Getting booking input
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    console.log('ok:', req.body);
    const appointment = await Appointment.create(req.body)
    res.json(appointment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;