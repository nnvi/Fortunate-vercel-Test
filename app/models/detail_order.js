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
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW // Mengatur nilai default menjadi tanggal saat ini
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW // Mengatur nilai default menjadi tanggal saat ini
    }
  }, {
    sequelize,
    modelName: 'detail_order',
    timestamps: true, 
  });
  return detail_order;
};