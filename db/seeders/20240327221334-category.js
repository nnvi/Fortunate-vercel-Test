'use strict';

const { Op } = require("sequelize");

const names = [
  "Limited offer",
  "Fortunate Bread",
  "Asian Cuisine",
  "Spaghetti",
  "Fortunate Rice",
  "Snacks",
  "Miscellaneous",
  "Fortunate Coffee",
  "Fortunate Tea",
  "Fresh Juice",
  "Fresh Mocktail",
  "Fortunate Dessert",
  "Vegan Pizza",
  "Soy Art",
  "Milkshake"
]

const images = [
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Limited%20Offer.jpg?updatedAt=1716675783105",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Bread.jpeg?updatedAt=1716675783368",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Asian%20Cuisine.jpeg?updatedAt=1716675783618",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Spaghetti.jpg?updatedAt=1716675786903",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Rice.jpg?updatedAt=1716675782922",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Snacks.png?updatedAt=1717839182779",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Miscellaneous.jpg?updatedAt=1716675787051",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Coffee.jpeg?updatedAt=1716675783816",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Tea.jpg?updatedAt=1716675783012",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fresh%20Juice.webp?updatedAt=1716675783582",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fresh%20Mocktail.jpeg?updatedAt=1716675783686",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Dessert.jpg?updatedAt=1716675783436",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Vegan_Pizza_QXShWYfu7.jpeg?updatedAt=1717834208500",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Soy_Art_5wik4hzG9.jpeg?updatedAt=1717834604270",
  "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Milkshake.jpg?updatedAt=1717846951836"
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
