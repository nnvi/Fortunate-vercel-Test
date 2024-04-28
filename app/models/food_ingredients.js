'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class food_ingredients extends Model {
    static associate() {
    }
  }
  food_ingredients.init({
    food_ingredients_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    food_ingredients_name: DataTypes.STRING,
    food_ingredients_qty: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'food_ingredients',
    tableName: 'food_ingredients',
    timestamps: true
  });
  return food_ingredients;
};