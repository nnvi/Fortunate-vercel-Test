'use strict';

const { Op } = require("sequelize");

const names = [
  "Limited offer",
  "Fortunate Bread",
  "Asian Cuisine",
  "Spaghetti",
  "Fortunate Rice",
  "Fast Food",
  "Miscellaneous",
  "Fortunate Coffee",
  "Fortunate Tea",
  "Fresh Juice",
  "Fresh Mocktail",
  "Fortunate Dessert",
]

const images = [
  "https://ibb.co/PwpbHJf",
  "https://ibb.co/9NhCQmK",
  "https://ibb.co/420GWVz",
  "https://ibb.co/188x1JG",
  "https://ibb.co/BLmsWCT",
  "https://ibb.co/rfn7HYq",
  "https://ibb.co/RY8LmSP",
  "https://ibb.co/yNwdj9D",
  "https://ibb.co/c2N6SDp",
  "https://ibb.co/zJSXRbK",
  "https://ibb.co/KhhmLx0",
  "https://ibb.co/n0bDqdh"
]

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
   const timestamp = new Date();
   const category = names.map((name, index) => ({
    category_name: name,
    category_image: images[index],
    created_at: timestamp,
    updated_at: timestamp

   }))
   await queryInterface.bulkInsert('category', category, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('category', null, {});
  }
};
