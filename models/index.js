const User = require('./User');
const Appointment = require('./Appointment');
const Pet = require("./Pet");

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

  Appointment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  User.hasMany(Appointment);

  Appointment.belongsTo(Pet, {
    foreignKey: 'pet_id',
    onDelete: 'CASCADE'
  });
  Pet.hasMany(Appointment, {
    onDelete: 'CASCADE'
  });


module.exports = { User, Pet, Appointment };