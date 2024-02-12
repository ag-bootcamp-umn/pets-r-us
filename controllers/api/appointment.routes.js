const router = require('express').Router();
const { Appointment } = require('../../models');

// Getting booking input
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body);
    res.json({
      msg: 'You go, Girl!'
    })
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;