'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_food_ingredients extends Model {
    static associate(models) {
        this.belongsTo(models.food_ingredients, {
            foreignKey: "food_ingredients_id"
        });
    }
  }
  detail_food_ingredients.init({
    detail_food_ingredients_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    food_ingredients_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    detail_food_ingredients_qty: DataTypes.INTEGER,
    detail_food_ingredients_type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'detail_order',
    tableName: 'detail_order',
    timestamps: true, 
  });
  return detail_food_ingredients;
};