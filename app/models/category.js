'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category.init({
    category_id: DataTypes.INTEGER,
    category_name: DataTypes.STRING,
    category_image: DataTypes.STRING,
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
    modelName: 'category',
    tableName: 'category',
    timestamps: true
  });
  return category;
};