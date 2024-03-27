'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order', {
      order_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cust_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      table_number: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      order_status: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      admin_acc_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { // Definisi foreign key
          model: 'admin_acc', // Nama tabel target
          key: 'admin_acc_id' // Kolom target yang menjadi primary key
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order');
  }
};