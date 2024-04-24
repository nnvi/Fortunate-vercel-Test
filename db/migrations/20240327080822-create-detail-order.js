'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_order', {
      detail_order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { // Definisi foreign key
          model: 'order', // Nama tabel target
          key: 'order_id' // Kolom target yang menjadi primary key
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      detail_order_qty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      detail_order_notes: {
        allowNull: true,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_order');
  }
};