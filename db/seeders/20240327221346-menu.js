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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Grilled_Cheesy_Rice_with_Chili_gTakruCp3.png?updatedAt=1717836110730",
            desc: "A savory blend of grilled rice and vegan cheese, served with a hearty chili made from black beans, kidney beans, and a medley of spices."
          },
          {
            name: "Grilled Cheesy Rice (no Chili)",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Grilled_Cheesy_Rice_No_Chili_SZPhoXqij.png?updatedAt=1717836092717",
            desc: "A savory blend of grilled rice and vegan cheese, perfectly melted for a creamy and satisfying texture."
          },
          {
            name: "Mentai Cheesy Rice",
            price: 47000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Limited%20Offer.jpg?updatedAt=1716675783105",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Delightful Rice",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Delightful%20Rice.png?updatedAt=1717906194434",
            desc: "Indulge in our flavorful delightful rice, topped with crispy spring roll, tofu, vegan pork and accompanied by fragrant ginger rice. *Note: Only ready at Saturday and Sunday."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Bread.jpeg?updatedAt=1716675783368",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Coffee Bread",
            price: 21000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Bread.jpeg?updatedAt=1716675783368",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Nuts Bread",
            price: 26000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Bread.jpeg?updatedAt=1716675783368",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Chocolate Almond Bread",
            price: 51000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Bread.jpeg?updatedAt=1716675783368",
            desc: "A menu of Fortunate Coffee."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Asian%20Cuisine.jpeg?updatedAt=1716675783618",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Japanese Miso Mie",
            price: 58000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Asian%20Cuisine.jpeg?updatedAt=1716675783618",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Korean Spicy Lamie",
            price: 58000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Asian%20Cuisine.jpeg?updatedAt=1716675783618",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Teriyaki Rice",
            price: 40000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Asian%20Cuisine.jpeg?updatedAt=1716675783618",
            desc: "A menu of Fortunate Coffee."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Spaghetti.jpg?updatedAt=1716675786903",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "S/F Carbonara",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Spaghetti.jpg?updatedAt=1716675786903",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "S/F Marinade",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Spaghetti.jpg?updatedAt=1716675786903",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "S/F Aglio Olio",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Spaghetti.jpg?updatedAt=1716675786903",
            desc: "A menu of Fortunate Coffee."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Rice.jpg?updatedAt=1716675782922",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Grilled Kampoeng Rice",
            price: 38000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Rice.jpg?updatedAt=1716675782922",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Grateful Rice",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Rice.jpg?updatedAt=1716675782922",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Lucky Rice",
            price: 26000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Rice.jpg?updatedAt=1716675782922",
            desc: "A menu of Fortunate Coffee."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fast%20Food.png?updatedAt=1716675784293",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Indonesia Satay",
            price: 28000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fast%20Food.png?updatedAt=1716675784293",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Crispy Tofu",
            price: 23000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fast%20Food.png?updatedAt=1716675784293",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Wakame Salad",
            price: 38000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fast%20Food.png?updatedAt=1716675784293",
            desc: "A menu of Fortunate Coffee."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Miscellaneous.jpg?updatedAt=1716675787051",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Vegan Chocolate Cookies",
            price: 34000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Miscellaneous.jpg?updatedAt=1716675787051",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Vegan Matcha Cookies (Ori)",
            price: 50000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Miscellaneous.jpg?updatedAt=1716675787051",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Vegan Matcha Cookies (Less Sugar)",
            price: 45000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Miscellaneous.jpg?updatedAt=1716675787051",
            desc: "A menu of Fortunate Coffee."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Coffee.jpeg?updatedAt=1716675783816",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Soy Coffee (Cold)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Coffee.jpeg?updatedAt=1716675783816",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Soy Cocoa (Hot)",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Coffee.jpeg?updatedAt=1716675783816",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Soy Cocoa (Cold)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Coffee.jpeg?updatedAt=1716675783816",
            desc: "A menu of Fortunate Coffee."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Tea.jpg?updatedAt=1716675783012",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Tea Tong",
            price: 10000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Tea.jpg?updatedAt=1716675783012",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Jasmine",
            price: 18000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Tea.jpg?updatedAt=1716675783012",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Peppermint",
            price: 18000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Tea.jpg?updatedAt=1716675783012",
            desc: "A menu of Fortunate Coffee."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fresh%20Juice.webp?updatedAt=1716675783582",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Orange",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fresh%20Juice.webp?updatedAt=1716675783582",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Guava",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fresh%20Juice.webp?updatedAt=1716675783582",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Sunkist",
            price: 34000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fresh%20Juice.webp?updatedAt=1716675783582",
            desc: "A menu of Fortunate Coffee."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fresh%20Mocktail.jpeg?updatedAt=1716675783686",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Meryminty",
            price: 28000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fresh%20Mocktail.jpeg?updatedAt=1716675783686",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Kimono",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fresh%20Mocktail.jpeg?updatedAt=1716675783686",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Sunrise",
            price: 36000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fresh%20Mocktail.jpeg?updatedAt=1716675783686",
            desc: "A menu of Fortunate Coffee."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Dessert.jpg?updatedAt=1716675783436",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Summer Brown",
            price: 28000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Dessert.jpg?updatedAt=1716675783436",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Affogato",
            price: 25000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Dessert.jpg?updatedAt=1716675783436",
            desc: "A menu of Fortunate Coffee."
          },
          {
            name: "Greeting Waffle",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Category/Fortunate%20Dessert.jpg?updatedAt=1716675783436",
            desc: "A menu of Fortunate Coffee."
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
          menu_desc: menuItem.desc,
          createdAt: timestamp,
          updatedAt: timestamp
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
