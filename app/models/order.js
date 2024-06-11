'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate(models) {
        this.belongsTo(models.user_acc, {
            foreignKey: "user_acc_id"
        });
    }
  }
  order.init({
    order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cust_name: DataTypes.STRING,
    table_number: DataTypes.INTEGER,
    order_status: DataTypes.BOOLEAN,
    price_total: DataTypes.INTEGER,
    user_acc_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
    tableName: 'order',
    timestamps: true, 
  });
  return order;
};