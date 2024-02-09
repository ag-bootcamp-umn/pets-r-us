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
    pet_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'pet',
          key: 'id',
        },
      },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
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
