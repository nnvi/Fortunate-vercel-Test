'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin_acc extends Model {
    static associate() {
    }
  }
  admin_acc.init({
    admin_acc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'admin_acc',
    tableName: 'admin_acc',
    timestamps: false,
  });
  return admin_acc;
};