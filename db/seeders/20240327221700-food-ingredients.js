'use strict';

const { Op } = require("sequelize");

const names = [
  "carrot",
  "corn",
  "cheese",
  "chilli",
  "mushroom",
  "rice",
  "ginger rice",
  "tomato",
  "lettuce",
  "cucumber",
  "bread",
  "vegetarian ground beef",
  "egg",
  "espresso",
  "nuts",
  "chocolate almond",
  "bihun",
  "mie",
  "broccoli",
  "spaghetti",
  "tempe",
  "tofu",
  "ginger",
  "bean sprouts",
  "dried seaweed",
  "chocolate",
  "matcha",
  "ice",
  "lemon",
  "tea",
  "melati tea",
  "peppermint leaves",
  "avocado",
  "banana",
  "orange",
  "guava",
  "nata de coco",
  "basil seeds",
  "sunkist",
  "kiwi",
  "melon",
  "strawberry",
  "vanilla",
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
   const food_ingredients = names.map((name) => ({
    food_ingredients_name: name,
    food_ingredients_qty: 10,
    createdAt: timestamp,
    updatedAt: timestamp

   }))
   await queryInterface.bulkInsert('food_ingredients', food_ingredients, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('food_ingredients', null, {});
  }
};
