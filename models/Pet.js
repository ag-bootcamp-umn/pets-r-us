const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {
}

// SPECIES IDs
// 1 = Dog
// 2 = Cat
// 3 = Bird
// 4 = Rodent
// 5 = Other

Pet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:1
    },
    hypoallergenic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
    kids_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pet',
  }
);

module.exports = Pet;
