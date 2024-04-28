'use strict';

const { Op } = require("sequelize");

const menuIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]; // Menu IDs yang akan dihubungkan dengan bahan baku
const foodIdsArr = [
  [1, 2, 3, 4, 6],    // Bahan baku untuk menu 1
  [1, 2, 3, 6],       // Bahan baku untuk menu 2
  [3, 5, 6],    // Bahan baku untuk menu 3
  [7, 8, 9, 10],
  [8, 9, 10, 11, 12],
  [13, 14],
  [13, 15],
  [13, 16],
  [6, 13],
  [17],
  [4, 13, 18],
  [6, 13 ,19],
  [8, 20],
  [3, 20],
  [8, 20],
  [20],
  [5, 6, 21, 22],
  [6, 23],
  [6, 8, 9, 10, 24],
  [6, 15],
  [8, 9, 10, 11, 12, 13],
  [5, 15],
  [22],
  [8, 9, 10],
  [11, 25],
  [26],
  [27],
  [27],
  [14],
  [14, 28],
  [14, 26, 28],
  [28, 29, 30],
  [30],
  [28, 29, 30],
  [28, 30, 32],
  [26, 28, 33, 34],
  [28, 35],
  [28, 36],
  [28, 37, 38, 39],
  [23, 28, 29],
  [14, 26, 28, 32],
  [28, 35, 40, 41],
  [28, 35, 39, 42],
  [14, 28, 43],
  [14, 28, 43],
  [14, 28, 43],
  [14, 28, 43],
  [13, 26]
];
const qtysArr = [
  [1, 1, 1, 3, 1],    // Kuantitas bahan baku untuk menu 1
  [1, 1, 1, 1],        // Kuantitas bahan baku untuk menu 2
  [1, 2, 1],      // Kuantitas bahan baku untuk menu 3
  [1, 1, 1, 2],
  [1, 1, 2, 1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 3],
  [1],
  [3, 1, 1],
  [1, 3, 2],
  [1, 1],
  [1, 1],
  [1, 1],
  [1],
  [1, 1, 1, 1],
  [1, 1],
  [1, 1, 1, 2, 1],
  [1, 1],
  [1, 1, 2, 1, 1, 1],
  [1, 1],
  [5],
  [2, 2, 3],
  [1, 1],
  [5],
  [5],
  [5],
  [1],
  [1, 6],
  [1, 2, 6],
  [1, 2, 6],
  [1],
  [6, 1, 1],
  [6, 1, 1],
  [1, 6, 1, 1],
  [6, 3],
  [6, 2],
  [6, 7, 20, 1],
  [1, 1, 1],
  [1, 1, 6, 4],
  [6, 1, 1, 1],
  [6, 1, 1, 1],
  [1, 10, 1],
  [1, 10, 1],
  [1, 10, 1],
  [1, 10, 1],
  [4, 3]
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const timestamp = new Date();
    let menuIngredients = [];
    console.log("Length of menuIds:", menuIds.length);
    console.log("Length of foodIdsArr:", foodIdsArr.length);
    console.log("Length of qtysArr:", qtysArr.length);


    // Loop melalui setiap menu ID
    for (let i = 0; i < menuIds.length; i++) {
      const menuId = menuIds[i];
      const foodId = foodIdsArr[i];
      const qty = qtysArr[i];

      // Loop melalui setiap bahan baku yang akan dihubungkan dengan menu ini
      for (let j = 0; j < foodId.length; j++) {
        const menuIngredient = {
          menu_id: menuId,
          food_ingredients_id: foodId[j],
          menu_ingredients_qty: qty[j],
          createdAt: timestamp,
          updatedAt: timestamp
        };

        menuIngredients.push(menuIngredient);
      }
    }

    // Masukkan data menu ingredients ke dalam tabel 'menu_ingredients'
    await queryInterface.bulkInsert('menu_ingredients', menuIngredients, {});
  },

  async down (queryInterface, Sequelize) {
    // Hapus semua data dari tabel 'menu_ingredients' ketika rollback
    await queryInterface.bulkDelete('menu_ingredients', null, {});
  }
};
