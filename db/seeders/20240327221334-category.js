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
  "https://i.ibb.co/dG93YXz/Limited-Offer.jpg",
  "https://ibb.co/9NhCQmKhttps://i.ibb.co/SPc9FDY/Fortunate-Bread.jpg",
  "https://ibb.co/https://i.ibb.co/8bQpM7q/Asian-Cuisine.webp",
  "https://ibb.co/https://i.ibb.co/nzzS98M/Spaghetti.jpg",
  "https://ibb.co/https://i.ibb.co/dBSKC5k/Fortunate-Rice.jpg",
  "https://ibb.co/https://i.ibb.co/Tqzvt6J/Fast-Food.png",
  "https://ibb.co/https://i.ibb.co/KbnCkG7/Miscellaneous.jpg",
  "https://ibb.co/https://i.ibb.co/YNzPsC6/Fortunate-Coffee.jpg",
  "https://ibb.co/https://i.ibb.co/bNrsMzy/Fortunate-Tea.jpg",
  "https://ibb.co/https://i.ibb.co/Kw92q7C/Fresh-Juice.webp",
  "https://ibb.co/https://i.ibb.co/xLL3fqC/Fresh-Mocktail.jpg",
  "https://ibb.co/https://i.ibb.co/3s7056t/Fortunate-Dessert.jpg"
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
    createdAt: timestamp,
    updatedAt: timestamp

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
