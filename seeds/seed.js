const sequelize = require('../config/connection');
const { User, Pet, Preference, Trait, Appointment } = require('../models');

const userData = require('./userData.json');
const appointmentData = require('./appointmentData.json');
const petData = require('./petData.json');
const preferenceData = require('./preference.json');
const traitData = require('./traitData.json');

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

  await Trait.bulkCreate(traitData, {
    individualHooks: true,
    returning: true,
  });

  await Preference.bulkCreate(preferenceData, {
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
