'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailFoodIngredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DetailFoodIngredients.init({
    food_ingredients_id: DataTypes.INTEGER,
    detail_food_ingredients_qty: DataTypes.INTEGER,
    detail_food_ingredients_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DetailFoodIngredients',
  });
  return DetailFoodIngredients;
};