'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu_ingredients extends Model {
    static associate(models) {
        this.belongsTo(models.menu, {
            foreignKey: "menu_id"
        });

        this.belongsToMany(models.food_ingredients, {
          through: 'MenuFoodIngredients', // Nama model perantara
          foreignKey: 'menu_ingredients_id', // Kunci luar model menu_ingredients pada model perantara
          otherKey: 'food_ingredients_id' // Kunci luar model food_ingredients pada model perantara
        });
    }
  }
  menu_ingredients.init({
    menu_ingredients_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    menu_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    food_ingredients_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    menu_ingredients_qty: DataTypes.INTEGER,
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW // Mengatur nilai default menjadi tanggal saat ini
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW // Mengatur nilai default menjadi tanggal saat ini
    },
  }, {
    sequelize,
    modelName: 'menu_ingredients',
    tableName: 'menu_ingredients',
    timestamps: true, 
  });
  return menu_ingredients;
};