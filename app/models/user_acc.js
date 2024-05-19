'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_acc extends Model {
    static associate() {
    }
  }
  user_acc.init({
    user_acc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_acc',
    tableName: 'user_acc',
    timestamps: false,
  });
  return user_acc;
};