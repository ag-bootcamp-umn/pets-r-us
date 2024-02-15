const router = require('express').Router();
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

const { Appointment } = require('../../models');

dayjs.extend(utc);
dayjs.extend(timezone);

// Getting booking input
router.post('/', async (req, res) => {
  console.log('req.body', req.body);
  try {
    const { date, pet_id } = req.body;
    const localDate = dayjs(date).tz('America/Chicago').format('YYYY-MM-DD HH:mm:ss');
    const appointment = await Appointment.create({date: localDate, pet_id, user_id: req.session.userId})
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