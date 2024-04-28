'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menu_ingredients', {
      menu_ingredients_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menu_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { // Definisi foreign key
          model: 'menu', // Nama tabel target
          key: 'menu_id' // Kolom target yang menjadi primary key
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      menu_ingredients_qty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('menu_ingredients');
  }
};