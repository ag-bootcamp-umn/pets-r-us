const router = require('express').Router();
const { Appointment } = require('../../models');

// Getting booking input
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    console.log('ok:', req.body);
    const appointment = await Appointment.create({...req.body, user_id: req.session.userId})
    res.json(appointment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:user_id', async (req, res) => {
  try {
    const userAppointments = await Appointment.findAll({
      where: {
        userId: req.params.user_id
      }
    });

    if (userAppointments.length > 0) {
      res.json(userAppointments);
    } else {
      res.status(404).json({ message: 'No appointments found for the given user ID' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;