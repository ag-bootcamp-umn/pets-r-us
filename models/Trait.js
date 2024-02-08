const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trait extends Model {
}

Trait.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pet_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'pet',
          key: 'id',
        },
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trait',
  }
);

module.exports = Trait;
