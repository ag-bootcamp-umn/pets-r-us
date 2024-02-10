const sequelize = require('../config/connection');
const { User, Pet, Appointment } = require('../models');

const userData = require('./userData.json');
const appointmentData = require('./appointmentData.json');
const petData = require('./petData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Pet.bulkCreate(petData, {
    individualHooks: true,
    returning: true,
  });

  await Appointment.bulkCreate(appointmentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
