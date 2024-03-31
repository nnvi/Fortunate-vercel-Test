'use strict';

const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const timestamp = new Date();
    let menuItems = [];

    // Definisikan data menu untuk setiap kategori tertentu
    const menuData = [
      {
        categoryId: 1,
        menuItems: [
          {
            name: "Grilled Cheesy Rice (with Chili)",
            price: 42000,
            image: "https://ibb.co/PwpbHJf"
          },
          {
            name: "Grilled Cheesy Rice (no Chili)",
            price: 42000,
            image: "https://ibb.co/PwpbHJf"
          },
          {
            name: "Mentai Cheesy Rice",
            price: 47000,
            image: "https://ibb.co/PwpbHJf"
          },
          {
            name: "Delightful Rice",
            price: 42000,
            image: "https://ibb.co/PwpbHJf"
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 2,
        menuItems: [
          {
            name: "Sesame Bun",
            price: 13000,
            image: "https://ibb.co/9NhCQmK",
          },
          {
            name: "Coffee Bread",
            price: 21000,
            image: "https://ibb.co/9NhCQmK",
          },
          {
            name: "Nuts Bread",
            price: 26000,
            image: "https://ibb.co/9NhCQmK",
          },
          {
            name: "Chocolate Almond Bread",
            price: 51000,
            image: "https://ibb.co/9NhCQmK",
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 3,
        menuItems: [
          {
            name: "Korean Casual Rice",
            price: 48000,
            image: "https://ibb.co/420GWVz"
          },
          {
            name: "Japanese Miso Mie",
            price: 58000,
            image: "https://ibb.co/420GWVz"
          },
          {
            name: "Korean Spicy Lamie",
            price: 58000,
            image: "https://ibb.co/420GWVz"
          },
          {
            name: "Teriyaki Rice",
            price: 40000,
            image: "https://ibb.co/420GWVz"
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 4,
        menuItems: [
          {
            name: "S/F Bolognaise",
            price: 42000,
            image: "https://ibb.co/188x1JG"
          },
          {
            name: "S/F Carbonara",
            price: 42000,
            image: "https://ibb.co/188x1JG"
          },
          {
            name: "S/F Marinade",
            price: 42000,
            image: "https://ibb.co/188x1JG"
          },
          {
            name: "S/F Aglio Olio",
            price: 42000,
            image: "https://ibb.co/188x1JG"
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 5,
        menuItems: [
          {
            name: "Fortunate Rice",
            price: 38000,
            image: "https://ibb.co/BLmsWCT"
          },
          {
            name: "Grilled Kampoeng Rice",
            price: 38000,
            image: "https://ibb.co/BLmsWCT"
          },
          {
            name: "Grateful Rice",
            price: 42000,
            image: "https://ibb.co/BLmsWCT"
          },
          {
            name: "Lucky Rice",
            price: 26000,
            image: "https://ibb.co/BLmsWCT"
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 6,
        menuItems: [
          {
            name: "Burger Special",
            price: 32000,
            image: "https://ibb.co/rfn7HYq"
          },
          {
            name: "Indonesia Satay",
            price: 28000,
            image: "https://ibb.co/rfn7HYq"
          },
          {
            name: "Crispy Tofu",
            price: 23000,
            image: "https://ibb.co/rfn7HYq"
          },
          {
            name: "Wakame Salad",
            price: 38000,
            image: "https://ibb.co/rfn7HYq"
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 7,
        menuItems: [
          {
            name: "Roasted Nori",
            price: 34000,
            image: "https://ibb.co/RY8LmSP"
          },
          {
            name: "Vegan Chocolate Cookies",
            price: 34000,
            image: "https://ibb.co/RY8LmSP"
          },
          {
            name: "Vegan Matcha Cookies (Ori)",
            price: 50000,
            image: "https://ibb.co/RY8LmSP"
          },
          {
            name: "Vegan Matcha Cookies (Less Sugar)",
            price: 45000,
            image: "https://ibb.co/RY8LmSP"
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 8,
        menuItems: [
          {
            name: "Soy Coffee (Hot)",
            price: 30000,
            image: "https://ibb.co/yNwdj9D"
          },
          {
            name: "Soy Coffee (Cold)",
            price: 32000,
            image: "https://ibb.co/yNwdj9D"
          },
          {
            name: "Soy Cocoa (Hot)",
            price: 30000,
            image: "https://ibb.co/yNwdj9D"
          },
          {
            name: "Soy Cocoa (Cold)",
            price: 32000,
            image: "https://ibb.co/yNwdj9D"
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 9,
        menuItems: [
          {
            name: "Ice Lemon Tea",
            price: 26000,
            image: "https://ibb.co/c2N6SDp"
          },
          {
            name: "Tea Tong",
            price: 10000,
            image: "https://ibb.co/c2N6SDp"
          },
          {
            name: "Jasmine",
            price: 18000,
            image: "https://ibb.co/c2N6SDp"
          },
          {
            name: "Peppermint",
            price: 18000,
            image: "https://ibb.co/c2N6SDp"
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 10,
        menuItems: [
          {
            name: "Avocado",
            price: 30000,
            image: "https://ibb.co/zJSXRbK"
          },
          {
            name: "Orange",
            price: 30000,
            image: "https://ibb.co/zJSXRbK"
          },
          {
            name: "Guava",
            price: 30000,
            image: "https://ibb.co/zJSXRbK"
          },
          {
            name: "Sunkist",
            price: 34000,
            image: "https://ibb.co/zJSXRbK"
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 11,
        menuItems: [
          {
            name: "Lemongrass",
            price: 25000,
            image: "https://ibb.co/KhhmLx0"
          },
          {
            name: "Meryminty",
            price: 28000,
            image: "https://ibb.co/KhhmLx0"
          },
          {
            name: "Kimono",
            price: 32000,
            image: "https://ibb.co/KhhmLx0"
          },
          {
            name: "Sunrise",
            price: 36000,
            image: "https://ibb.co/KhhmLx0"
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 12,
        menuItems: [
          {
            name: "Ice Cream Coffee",
            price: 22000,
            image: "https://ibb.co/n0bDqdh"
          },
          {
            name: "Summer Brown",
            price: 28000,
            image: "https://ibb.co/n0bDqdh"
          },
          {
            name: "Affogato",
            price: 25000,
            image: "https://ibb.co/n0bDqdh"
          },
          {
            name: "Greeting Waffle",
            price: 32000,
            image: "https://ibb.co/n0bDqdh"
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      
      // Definisikan data menu untuk kategori lainnya
    ];

    // Loop melalui setiap kategori
    for (const categoryData of menuData) {
      const categoryId = categoryData.categoryId;
      
      // Loop melalui setiap menu item untuk kategori ini
      for (const menuItem of categoryData.menuItems) {
        // Buat menu item dengan menggunakan category_id yang sesuai
        const menu = {
          category_id: categoryId,
          menu_name: menuItem.name,
          menu_price: menuItem.price,
          menu_image: menuItem.image,
          menu_desc: "Indonesian Food, we serve the best of combined rice and beancurd w/ blackpepper spices sauce and no MSG potato spices soup.",
          created_at: timestamp,
          updated_at: timestamp
        };

        // Tambahkan menu item ke dalam array menuItems
        menuItems.push(menu);
      }
    }

    // Masukkan semua menu ke dalam tabel 'menu'
    await queryInterface.bulkInsert('menu', menuItems, {});
  },

  async down (queryInterface, Sequelize) {
    // Hapus semua data dari tabel 'menu' ketika rollback
    await queryInterface.bulkDelete('menu', null, {});
  }
};
