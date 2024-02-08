const User = require('./User');
const Appointment = require('./Appointment');
const Pet = require("Pet");
const Preference = require("./Preference");
const Trait = require("./Trait");

Pet.hasMany(Trait, {
  foreignKey: 'pet_id',
  onDelete: 'CASCADE'
});

Trait.belongsTo(Pet, {
  foreignKey: 'pet_id'
});


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