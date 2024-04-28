'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    static associate(models) {
        this.belongsTo(models.category, {
            foreignKey: "category_id"
          })
    }
  }
  menu.init({
    menu_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    menu_name: DataTypes.STRING,
    menu_price: DataTypes.FLOAT,
    menu_image: DataTypes.STRING,
    menu_desc: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'menu',
    tableName: 'menu',
    timestamps: true, // Aktifkan timestamps
  });
  return menu;
};