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
      detail_food_ingredients_type: DataTypes.ENUM('In', 'Out'),
    }, {
      sequelize,
      modelName: 'detail_food_ingredients',
      tableName: 'detail_food_ingredients',
      timestamps: true, 
    });
    return detail_food_ingredients;
  };