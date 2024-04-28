'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_order extends Model {
    static associate(models) {
        this.belongsTo(models.order, {
            foreignKey: "order_id"
        });

        this.hasMany(models.menu, {
            foreignKey: "menu_id"
        });
    }
  }
  detail_order.init({
    detail_order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    menu_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    detail_order_qty: DataTypes.INTEGER,
    detail_order_notes: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'detail_order',
    tableName: 'detail_order',
    timestamps: true, 
  });
  return detail_order;
};