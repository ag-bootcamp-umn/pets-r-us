const User = require('./User');
const Appointment = require('./Appointment');
const Pet = require("./Pet");

Pet.belongsToMany(User,{
  through: {
    model: Preference,
    unique: false
  }});

  User.belongsToMany(Pet,{
    through: {
      model: Preference,
      unique: false
    }});

User.belongsToMany(Pet, {
    through: {
      model: Appointment,
      unique: false
    }
  });

  Pet.belongsToMany(User,{
    through: {
      model: Appointment,
      unique: false
    }});

  

module.exports = { User, Pet, Appointment };