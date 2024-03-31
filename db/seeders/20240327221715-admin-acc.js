'use strict';

const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const password = "F0rtun4t3_C4f3"
   const encryptedPassword = bcrypt.hashSync(password, 10);

    await queryInterface.bulkInsert('admin_acc', [{
      username: 'admin',
      password: encryptedPassword
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('admin_acc', null, {});
  }
};
