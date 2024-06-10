'use strict';

const { Op } = require("sequelize");

const names = [
"Vegan cheese",
"Vegan meat",
"Milk",
"Eggs",
"Ice Cream Mocha",
"Waffle",
"Coffee",
"Tempeh",
"Tofu",
"Seaweed",
"Miso paste",
"Teriyaki sauce",
"Black pepper sauce",
"Bolognaise sauce",
"Carbonara sauce",
"Marinade sauce",
"Potatoes",
"Burger patties",
"Satay skewers",
"Edamame beans",
"Garbanzo",
"Gyoza wrappers",
"Lumpia wrappers",
"Pandan paste",
"Coconut milk",
"Nori sheets",
"Chocolate chips",
"Matcha powder",
"Lemongrass",
"Papaya",
"Strawberry",
"Carrot",
"Orange",
"Watermelon",
"Guava",
"Passion fruit",
"Green apple",
"Mango",
"Pineapple",
"Kiwi",
"Avocado",
"Salad Dressing",
"Sunkist",
"Terong Belanda",
"Lemon",
"Cucumber",
"Tomato",
"Melon",
"Peppermint",
"Lime",
"Ginger",
"Tea",
"Soya milk",
"Mocha powder",
"Pizza dough",
"Espresso",
"Jelly",
"Soy milk",
"Cocoa powder",
"Cappucino",
"Chocolate syrup",
"Banana",
"Pumpkin seeds",
"Palm Sugar",
"Black Coffee",
"Coffee syrup",
"Biscotti",
"Fruit Stick",
"Sesame Bun",
"Crispy Bun",
"Red Bean Bun",
"Chocolate Bread",
"Choco Roll Bread",
"Pumpkin Bun",
"Coffee Bread",
"Matcha Bread",
"Matcha Cranberries",
"Ciabatta",
"Purple Toast",
"Multigrain Toast",
"Nuts Bread",
"Longan Bread",
"Fruits Bread",
"Wheat Bun (a loaf of 6)",
"Wheat Toast",
"Pumpkin Loaf",
"Chocolate Almond Bread",
"Birthday Bread",
"Ron88 (330ml)",
"Ice Cream Cocoa",
"Ice Cream Vanilla",
"Ice Cream Coffee",
"Ice Cream Peppermint",
"Brownies (Vegan)",
"Ice Bread Chocolate",
"Srikaya Vegan",
"Srikaya Pandan Vegan",
"Roasted Nori",
"Vegan Chocolate Cookies",
"Vegan Matcha Cookies (Ori)",
"Vegan Matcha Cookies (Less Sugar)",
"Spring Roll",
"Gochujang Sauce",
"Curry Paste",
"Kaya",
"Beancurd",
"Sweet Potato",
"Enoki",
"Bun",
"Roejak Sauce",
"Green Tea",
"Jasmine",
"Earl Grey",
"English Breakfast",
"Chamomile",
"Geb Maitcha",
"Fresh Mushtard",
"Chocolate",
"Cranberry",
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
    food_ingredients_stock: 20,
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
