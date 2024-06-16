'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_food_ingredients', {
      detail_food_ingredients_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      food_ingredients_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { // Definisi foreign key
          model: 'food_ingredients', // Nama tabel target
          key: 'food_ingredients_id' // Kolom target yang menjadi primary key
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      detail_food_ingredients_qty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      detail_food_ingredients_type: {
        allowNull: false,
        type: Sequelize.ENUM('In', 'Out')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_food_ingredients');
  }
};