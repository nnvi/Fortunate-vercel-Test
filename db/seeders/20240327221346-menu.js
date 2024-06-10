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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Grilled_Cheesy_Rice__with_Chili__gTakruCp3.png?updatedAt=1717836110730",
            desc: "A savory blend of grilled rice and vegan cheese, served with a hearty chili made from black beans, kidney beans, and a medley of spices."
          },
          {
            name: "Grilled Cheesy Rice (no Chili)",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Grilled_Cheesy_Rice__No_Chili__SZPhoXqij.png?updatedAt=1717836092717",
            desc: "A savory blend of grilled rice and vegan cheese, perfectly melted for a creamy and satisfying texture."
          },
          {
            name: "Delightful Rice",
            price: 47000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Delightful%20Rice.png?updatedAt=1717906194434",
            desc: "Indulge in our flavorful delightful rice, topped with crispy spring roll, tofu, vegan pork and accompanied by fragrant ginger rice."
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 2,
        menuItems: [
          {
            name: "Biscotti",
            price: 11000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Biscotti.jpg?updatedAt=1717906192860",
            desc: "Crispy Italian biscuit perfect for dipping in your favorite hot beverage."
          },
          {
            name: "Fruit Stick",
            price: 13000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Fruit%20Stick.jpg?updatedAt=1717906192852",
            desc: "Fresh assortment of seasonal fruits served on a stick for a healthy and refreshing snack."
          },
          {
            name: "Sesame Bun",
            price: 13000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Sesame%20Bun.jpeg?updatedAt=1717906336304",
            desc: "Soft and fluffy bun generously coated with toasted sesame seeds for a nutty flavor."
          },
          {
            name: "Crispy Bun",
            price: 13000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Crispy%20Bun.jpeg?updatedAt=1717906194321",
            desc:"Crispy on the outside, soft on the inside - a delightful treat for any time of the day."
          },
          {
            name: "Red Bean Bun",
            price: 13000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Red%20Bean%20Bun.jpeg?updatedAt=1717906336322",
            desc: "Sweet and savory bun filled with rich red bean paste, a classic favorite."
          },
          {
            name: "Chocolate Bread",
            price: 13000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Chocholate%20Bread.jpeg?updatedAt=1717906194111",
            desc: "Indulgent chocolate bread with a rich cocoa flavor, perfect for chocolate lovers."
          },
          {
            name: "Choco Roll Bread",
            price: 13000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Choco%20Roll%20Bread.jpeg?updatedAt=1717906193525",
            desc: "Irresistibly soft bread filled with creamy chocolate, a decadent treat for any occasion."
          },
          {
            name: "Pumpkin Bun",
            price: 14000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Pumpkin%20Bun.webp?updatedAt=1717906197060",
            desc: "Soft and moist bun infused with the sweet and earthy flavors of pumpkin."
          },
          {
            name: "Coffee Bread",
            price: 21000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Coffee%20Bread.jpeg?updatedAt=1717906192683",
            desc: "Aromatic bread infused with the bold flavor of coffee, perfect for breakfast or as a snack"
          },
          {
            name: "Matcha Bread",
            price: 21000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Matcha%20Bread.jpeg?updatedAt=1717906196507",
            desc: "Delicate bread infused with the subtle and earthy flavors of matcha, a delightful twist on traditional bread."
          },
          {
            name: "Matcha Cranberries",
            price: 21000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Matcha%20Cranberries.jpeg?updatedAt=1717906196358",
            desc: "Soft and chewy bread studded with tart cranberries and infused with the delicate flavor of matcha."
          },
          {
            name: "Ciabatta",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Ciabatta.jpg?updatedAt=1717906193058",
            desc: "Rustic Italian bread with a crisp crust and chewy interior, perfect for sandwiches or dipping in olive oil."
          },
          {
            name: "Purple Toast",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Purple%20Toast.jpeg?updatedAt=1717906336332",
            desc: "Vibrantly colored toast made from nutrient-rich purple sweet potatoes, a feast for the eyes and the palate."
          },
          {
            name: "Multigrain Toast",
            price: 23000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Mulitgrain%20Toast.jpeg?updatedAt=1717906196859",
            desc: "Nutrient-packed toast made with a blend of wholesome grains and seeds for a hearty and satisfying breakfast."
          },
          {
            name: "Nuts Bread",
            price: 26000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Nuts%20Bread.jpeg?updatedAt=1717906196022",
            desc: "Nutty and wholesome bread packed with a variety of nuts for a crunchy and nutritious bite."
          },
          {
            name: "Longan Bread",
            price: 26000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Longan%20Bread.jpg?updatedAt=1717906196520",
            desc: "Sweet and succulent bread filled with juicy longan fruit, a refreshing and unique treat."
          },
          {
            name: "Fruits Bread",
            price: 26000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Fruits%20Bread.jpeg?updatedAt=1717906932223",
            desc: "Bursting with the natural sweetness of assorted fruits, this bread is a fruity delight in every bite."
          },
          {
            name: "Wheat Bun (Isi 6)",
            price: 36000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Wheat%20Bun.jpeg?updatedAt=1717906336241",
            desc: "Wholesome and hearty wheat buns, perfect for sandwiches or enjoyed on their own."
          },
          {
            name: "Wheat Toast",
            price: 36000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Wheat%20Toast.jpeg?updatedAt=1717906337102",
            desc: "Nutrient-rich wheat toast, toasted to perfection for a crispy and satisfying crunch."
          },
          {
            name: "Pumpkin Loaf",
            price: 50000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Pumpkin%20Loaf.jpg?updatedAt=1717906196570",
            desc: "Moist and flavorful loaf infused with the earthy sweetness of pumpkin, a seasonal favorite."
          },
          {
            name: "Chocolate Almond Bread",
            price: 51000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Chocolate%20Almond%20Bread.jpg?updatedAt=1717906192888",
            desc: "Decadent bread loaded with rich chocolate and crunchy almonds for a truly indulgent experience."
          },
          {
            name: "Birthday Bread",
            price: 56000,
            image:"https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Birthday%20Bread.jpeg?updatedAt=1717906192790",
            desc: "Celebrate with our festive birthday bread, filled with colorful sprinkles and topped with a sweet glaze."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Korean%20Casual%20Rice.png?updatedAt=1717907233742",
            desc: "Enjoy the comforting flavors of Korea with our casual rice dish, featuring a delightful blend of seasoned vegetables, tofu, and your choice of protein served over fluffy white rice."
          },
          {
            name: "Japanese Miso Mie",
            price: 58000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Japanese%20Miso%20Mie.png?updatedAt=1717907233670",
            desc: "Indulge in the umami goodness of Japan with our miso rice dish, featuring tender vegetables and tofu simmered in a savory miso broth, served over steamed rice."
          },
          {
            name: "Korean Spicy Lamie",
            price: 58000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Korea%20Spicy%20Lamie.png?updatedAt=1717907233588",
            desc: "Spice up your meal with our Korean spicy lamie, featuring chewy noodles stir-fried with fresh vegetables and tofu in a fiery gochujang sauce."
          },
          {
            name: "Teriyaki Rice",
            price: 40000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Teriyaki%20Rice.png?updatedAt=1717907235095",
            desc: "Savor the sweet and savory flavors of Japan with our teriyaki rice dish, featuring grilled tofu or your choice of protein smothered in a rich teriyaki glaze."
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 4,
        menuItems: [
          {
            name: "S/F Blackpepper",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/SF%20Blackpepper.png?updatedAt=1717907399071",
            desc: "Delight in the bold flavors of our S/F Blackpepper dish, featuring succulent vegan meat cooked to perfection in a savory black pepper sauce."
          },
          {
            name: "S/F Bolognaise",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/SF%20Bolognese.png?updatedAt=1717907398697",
            desc: "Experience the classic Italian flavors of our S/F Bolognaise, made with hearty vegan meat simmered in a rich tomato and herb sauce."
          },
          {
            name: "S/F Carbonara",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/SF%20Carbonara.png?updatedAt=1717907399277",
            desc: "Indulge in the creamy goodness of our S/F Carbonara, featuring vegan bacon and mushrooms tossed in a velvety cashew-based sauce with hints of garlic and black pepper."
          },
          {
            name: "S/F Marinade",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/SF%20Marinade.png?updatedAt=1717907399262",
            desc: "Dive into the flavors of our S/F Marinade, featuring tender vegan meat marinated in a savory blend of herbs and spices."
          },
          {
            name: "S/F Aglio Olio",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/SF%20Aglio%20Olio.png?updatedAt=1717907399366",
            desc: "Enjoy the simplicity of our S/F Aglio Olio, featuring al dente spaghetti noodles tossed in fragrant garlic-infused olive oil and topped with chili flakes and fresh parsley."
          },
          {
            name: "Mashed Potato",
            price: 38000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Mashed%20Potato.png?updatedAt=1717907399076",
            desc: "Delight in the creamy goodness of our Mashed Potato, made with fluffy potatoes mashed to perfection and seasoned with herbs and spices."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Fortunate%20Rice.png?updatedAt=1717907572220",
            desc: "Experience a fusion of flavors with our fortunate rice dish, featuring fluffy steamed rice served with a hearty homemade chili and potato spicy soup."
          },
          {
            name: "Grilled Curry Rice",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Grilled%20Curry%20Rice.png?updatedAt=1717907572167",
            desc: "Savor the exotic flavors of our Grilled Curry Rice, featuring fragrant curry-infused rice grilled to perfection and served with a medley of grilled vegetables."
          },
          {
            name: "Grilled Kampoeng Rice",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Grilled%20Kampoeng%20Rice.png?updatedAt=1717907572055",
            desc: "Indulge in the rustic charm of our Grilled Kampoeng Rice, featuring tender grilled rice cakes infused with traditional Indonesian spices."
          },
          {
            name: "Grateful Rice",
            price: 42000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Grateful%20Rice.png?updatedAt=1717907572064",
            desc: "Be grateful for every bite of our Grateful Rice, featuring fragrant jasmine rice cooked to perfection and served with a generous helping of savory vegan protein and fresh vegetables."
          },
          {
            name: "Lucky Rice",
            price: 26000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Lucky%20Rice.png?updatedAt=1717907572072",
            desc: "Enjoy a stroke of luck with our Lucky Rice dish, featuring aromatic basmati rice cooked to fluffy perfection."
          },
          {
            name: "Joyful Rice",
            price: 26000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Joyful%20Rice.png?updatedAt=1717907572502",
            desc: "Experience pure joy with every bite of our Joyful Rice, featuring a vibrant mix of colorful vegetables, tofu, and aromatic rice stir-fried to perfection."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Burger%20Special.png?updatedAt=1717907999786",
            desc: "Enjoy our Burger Special, featuring a mouthwatering vegan patty topped with fresh lettuce, tomato, onion, and your choice of sauces, all served on a toasted bun."
          },
          {
            name: "Indonesia Satay",
            price: 28000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Indonesia%20Satay.png?updatedAt=1717908002891",
            desc: "Indulge in the rich flavors of Indonesia with our Indonesia Satay, featuring skewers of grilled vegan meat marinated in a traditional Indonesian spice blend and peanut sauce."
          },
          {
            name: "Ostreatus Satay",
            price: 29000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Ostreatus%20Satay.png?updatedAt=1717908003710",
            desc: "Savor the earthy flavors of our Ostreatus Satay, featuring skewers of grilled oyster mushrooms marinated in a savory sauce and served with a tangy dipping sauce."
          },
          {
            name: "Edamame",
            price: 19000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Edamame.png?updatedAt=1717907999630",
            desc: "Enjoy the simplicity of our Edamame, featuring steamed young soybeans seasoned with sea salt for a light and healthy snack."
          },
          {
            name: "Garbanzo",
            price: 19000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Garbanza.png?updatedAt=1717908002818",
            desc: "Delight in the nutty flavors of our Garbanzo beans, lightly seasoned and roasted to perfection for a crunchy and satisfying snack."
          },
          {
            name: "Tempe Satay",
            price: 22500,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Tempe%20Satay.png?updatedAt=1717908007227",
            desc: "Experience the unique texture and flavor of our Tempe Satay, featuring skewers of grilled tempeh marinated in a savory sauce and served with a tangy dipping sauce."
          },
          {
            name: "Crispy Tofu",
            price: 23000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Crispy%20Tofu.png?updatedAt=1717907999721",
            desc: "Indulge in the crispy goodness of our Crispy Tofu, featuring golden-brown cubes of tofu fried to perfection and served with a sweet and savory dipping sauce."
          },
          {
            name: "Potato Wedges",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Potato%20Wedges.png?updatedAt=1717908003142",
            desc: "Enjoy our Potato Wedges, featuring thick-cut potato wedges seasoned and baked to crispy perfection, served with your choice of dipping sauce."
          },
          {
            name: "Veggies Gyoza",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Veggies%20Gyoza.png?updatedAt=1717908007332",
            desc: "Dive into the savory flavors of our Veggies Gyoza, featuring delicate dumplings filled with a savory vegetable filling, pan-fried to golden perfection, and a tangy dipping sauce."
          },
          {
            name: "Lumpia 2 Musim",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Lumpia%202%20Musim.png?updatedAt=1717908003344",
            desc: "Experience the crispy goodness of our Lumpia 2 Musim, featuring spring rolls filled with a flavorful mixture of vegetables and served with a sweet and tangy dipping sauce."
          },
          {
            name: "Chukawakame",
            price: 24000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Chukawakame.png?updatedAt=1717907999638",
            desc: "Refresh your palate with our Chukawakame salad, featuring a delightful combination of crunchy cucumber and tender wakame seaweed, tossed in a tangy dressing."
          },
          {
            name: "Fruit Salad",
            price: 38000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Fruit%20Salad.png?updatedAt=1717908002745",
            desc: "Enjoy a refreshing medley of seasonal fruits with our Fruit Salad, featuring a colorful assortment of fresh fruits tossed in a light and tangy dressing."
          },
          {
            name: "Wakame Salad",
            price: 38000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Wakame%20Salad.png?updatedAt=1717908007374",
            desc: "Dive into the ocean of flavor with our Wakame Salad, featuring tender wakame seaweed tossed in a sesame-infused dressing with hints of soy sauce and sesame oil."
          },
          {
            name: "Beancurd Salad",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Beancurd%20Salad.png?updatedAt=1717907999829",
            desc: "Indulge in the delicate flavors of our Beancurd Salad, featuring silky-smooth beancurd paired with crisp vegetables and dressed in a tangy vinaigrette."
          },
          {
            name: "French Fries",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/French%20Fries.png?updatedAt=1717907999656",
            desc: "Treat yourself to classic comfort food with our French Fries, featuring crispy golden fries seasoned to perfection and served with your choice of dipping sauce."
          },
          {
            name: "Fried Sweet Potato Japan",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Fried%20Sweet%20Potato%20Japan.png?updatedAt=1717907999684",
            desc: "Experience the sweet and savory flavors of Japan with our Fried Sweet Potato Japan, featuring tender sweet potato fries coated in a crispy batter and a side of dipping sauce."
          },
          {
            name: "Banana Crispy",
            price: 20000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Banana%20Crispy.png?updatedAt=1717907999661",
            desc: "Indulge your sweet tooth with our Banana Crispy, featuring ripe bananas coated in a light and crispy batter, fried to golden perfection, and a dusting of powdered sugar."
          },
          {
            name: "Korean Casual Snack",
            price: 38000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Korean%20Casual%20Snack.png?updatedAt=1717908002792",
            desc: "Experience the bold flavors of Korea with our Korean Casual Snack, featuring a satisfying combination of crunchy snacks seasoned with a blend of Korean spices."
          },
          {
            name: "Enoki Crispy",
            price: 23000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Enoki%20Crispy.png?updatedAt=1717907999665",
            desc: "Delight in the delicate flavors of our Enoki Crispy, featuring bundles of enoki mushrooms coated in a crispy batter, fried to perfection, and a savory dipping sauce."
          },
          {
            name: "Lumpia Sayur",
            price: 23000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Lumpia%20Sayur.png?updatedAt=1717908003271",
            desc: "Savor the crispy goodness of our Lumpia Sayur, featuring spring rolls filled with a savory vegetable filling, fried to golden perfection, and a sweet and tangy dipping sauce."
          },
          {
            name: "Blessing Bag",
            price: 24000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Blessing%20Bag.png?updatedAt=1717907999725",
            desc: "Treat yourself to our Blessing Bag, featuring a delightful assortment of crispy snacks and savory treats, perfect for sharing or enjoying on your own."
          }, 
          {
            name: "Pandan Toast",
            price: 24000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Pandan%20Toast.png?updatedAt=1717908003332",
            desc: "Indulge in the fragrant flavors of our Pandan Toast, featuring thick slices of toast infused with the sweet aroma of pandan leaves and served with a dollop of creamy vegan butter."
          },
          {
            name: "Srikaya Vegan",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Skrikaya%20Vegan.png?updatedAt=1717908007332",
            desc: "Experience the rich and creamy flavors of our Srikaya Vegan spread, made from coconut milk and pandan leaves, perfect for spreading on toast or enjoying as a sweet treat."
          },
          {
            name: "Srikaya Pandan Vegan",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Skrikaya%20Vegan%20Pandan.png?updatedAt=1717908006982",
            desc: "Indulge in the tropical flavors of our Srikaya Pandan Vegan spread, featuring the rich and creamy combination of coconut milk and pandan leaves."
          },
          {
            name: "Srikaya Toast",
            price: 24000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Skrikaya%20Toast.png?updatedAt=1717908003223",
            desc: "Treat yourself to our Srikaya Toast, featuring thick slices of toast generously spread with creamy Srikaya Vegan spread, perfect for a sweet and satisfying snack."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Roasted%20Nori.png?updatedAt=1717908472966",
            desc: "Delight in the savory flavors of our Roasted Nori, featuring crispy sheets of roasted seaweed seasoned with a touch of salt for a satisfying snack."
          },
          {
            name: "Vegan Chocolate Cookies",
            price: 34000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Vegan%20Chocolate%20Cookies.png?updatedAt=1717908472911",
            desc: "Indulge your sweet tooth with our Vegan Chocolate Cookies, featuring rich and decadent chocolate cookies made with vegan ingredients for guilt-free indulgence."
          },
          {
            name: "Vegan Matcha Cookies (Ori)",
            price: 50000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Vegan%20Matcha%20Cookies%20(Ori).png?updatedAt=1717908472984",
            desc: "Experience the delicate flavors of Japan with our Vegan Matcha Cookies (Original), featuring buttery cookies infused with the earthy and fragrant notes of matcha green tea."
          },
          {
            name: "Vegan Matcha Cookies (Less Sugar)",
            price: 45000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Vegan%20Matcha%20Cookies%20(Less%20Sugar).png?updatedAt=1717908472695",
            desc: "Enjoy the subtle sweetness of our Vegan Matcha Cookies (Less Sugar), featuring the same delightful matcha flavor with less sugar for a lighter treat."
          },
          {
            name: "Roejak",
            price: 36000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Roejak.png?updatedAt=1717908472724",
            desc: "Indulge in the exotic flavors of Indonesia with our Roejak, featuring a refreshing salad of tropical fruits, peanuts, and a sweet and tangy."
          },
          {
            name: "Fruit Platter",
            price: 48000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Fruit%20Platter.png?updatedAt=1717908472555",
            desc: "Enjoy a bountiful selection of fresh fruits with our Fruit Platter, featuring a colorful assortment of seasonal fruits, perfect for sharing or enjoying as a healthy snack."
          }
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 8,
        menuItems: [
          {
            name: "Manual Brew Local (Hot)",
            price: 28000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Manual%20Brew%20Local%20(Hot).jpeg?updatedAt=1717908649556",
            desc: "Enjoy the rich aroma and bold flavors of our Manual Brew Local (Hot) coffee, brewed to perfection using locally sourced coffee beans and served piping hot."
          },
          {
            name: "Manual Brew Local (Cold)",
            price: 31000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Manual%20Brew%20Local%20(Cold).jpeg?updatedAt=1717908649039",
            desc: "Quench your thirst with our Manual Brew Local (Cold) coffee, featuring locally sourced coffee beans brewed to perfection and served chilled over ice for a refreshing pick-me-up."
          },
          {
            name: "Manual Brew Import (Hot)",
            price: 36000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Manual%20Brew%20Import%20(Hot).jpg?updatedAt=1717908649065",
            desc: "Experience the exotic flavors of our Manual Brew Import (Hot) coffee, featuring carefully selected imported coffee beans brewed to perfection."
          },
          {
            name: "Manual Brew Import (Cold)",
            price: 39000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Manual%20Brew%20Import%20(Cold).webp?updatedAt=1717908648737",
            desc: "Chill out with our Manual Brew Import (Cold) coffee, featuring imported coffee beans brewed to perfection and served cold over ice for a smooth and refreshing coffee indulgence."
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 9,
        menuItems: [
          {
            name: "Tea Tong",
            price: 10000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Tea%20Tong.jpg?updatedAt=1717908957497",
            desc: "Enjoy a simple and comforting cup of Tea Tong, a traditional tea blend with subtle flavors that soothe the senses."
          },
          {
            name: "Ice Tea Tong",
            price: 10000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Ice%20Tea%20Tong.jpeg?updatedAt=1717908954478",
            desc: "Quench your thirst with our Ice Tea Tong, a refreshing blend of traditional tea served chilled over ice for a revitalizing drink."
          },
          {
            name: "Hot Tea",
            price: 12000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Hot%20tea.jpeg?updatedAt=1717908954449",
            desc: "Warm up with our Hot Tea, featuring your choice of classic tea varieties served piping hot for a cozy and comforting beverage."
          },
          {
            name: "Ice Tea",
            price: 12000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Ice%20Tea.jpg?updatedAt=1717908954878",
            desc: "Cool down with our Ice Tea, featuring your choice of classic tea varieties served chilled over ice for a refreshing and revitalizing drink."
          },
          {
            name: "Green Tea",
            price: 18000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Green%20Tea.jpe?updatedAt=1717908954418",
            desc: "Experience the fresh and grassy flavors of our Green Tea, a classic Japanese tea known for its antioxidants and delicate taste."
          },
          {
            name: "Jasmine",
            price: 18000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Jasmine.webp?updatedAt=1717908958211",
            desc: "Indulge in the fragrant aroma and floral notes of our Jasmine tea, a delicate and soothing beverage perfect for relaxation."
          },
          {
            name: "Earl Grey",
            price: 18000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Earl%20Grey.jpeg?updatedAt=1717908954321",
            desc: "Enjoy the bold and citrusy flavors of our Earl Grey tea, a classic blend of black tea infused with bergamot for a distinctive taste."
          },
          {
            name: "English Breakfast",
            price: 18000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/English%20Breakfast.jpg?updatedAt=1717908954437",
            desc: "Start your day right with our English Breakfast tea, a robust and full-bodied blend perfect for enjoying with breakfast or any time of day."
          },
          {
            name: "Chamomile",
            price: 18000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Chamomile.webp?updatedAt=1717908954500",
            desc: "Relax and unwind with our Chamomile tea, featuring the calming and soothing flavors of chamomile flowers for a peaceful moment of tranquility."
          },
          {
            name: "Peppermint",
            price: 18000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Peppermint.jpg?updatedAt=1717908957949",
            desc: "Refresh your senses with our Peppermint tea, featuring the cool and invigorating flavors of peppermint leaves for a revitalizing pick-me-up."
          },
          {
            name: "Hot Lemon Tea",
            price: 24000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Hot%20Lemon%20Tea.jpeg?updatedAt=1717908954354",
            desc: "Refresh your senses with our Peppermint tea, featuring the cool and invigorating flavors of peppermint leaves for a revitalizing pick-me-up."
          },
          {
            name: "Ice Lemon Tea",
            price: 26000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Ice%20Lemon%20Tea.jpe?updatedAt=1717908954544",
            desc: "Cool down and refresh with our Ice Lemon Tea, featuring a revitalizing blend of chilled black tea, lemon juice, and a hint of sweetness for a perfect balance of flavors."
          },
          {
            name: "Mix Fruit Tea",
            price: 58000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Mix%20Fruit%20Tea.png?updatedAt=1717909148703",
            desc: "Indulge in a burst of fruity flavors with our Mix Fruit Tea, featuring a delightful blend of assorted fruits infused with fragrant tea for a refreshing and rejuvenating drink."
          },
          {
            name: "Teapot Green Tea (4 orang)",
            price: 36000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Teapot%20Green%20Tea.jpg?updatedAt=1717908957604",
            desc: "Share a pot of our Teapot Green Tea with friends or family, featuring a generous serving of green tea brewed to perfection and served in a teapot for communal enjoyment."
          },
          {
            name: "Gen Maitcha (4 orang)",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Gen%20Maicha.jpg?updatedAt=1717908954505",
            desc: "Experience the unique flavors of our Gen Maitcha, a traditional Japanese tea ceremony blend featuring powdered green tea and roasted rice."
          },
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 10,
        menuItems: [
          {
            name: "Carrot",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Carrot.webp?updatedAt=1717910029752",
            desc: "Refresh yourself with our Carrot Juice, a vibrant blend of fresh carrots and nutritious flaxseeds for a healthy and invigorating drink."
          },
          {
            name: "Cucumber",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Cucumber.jpg?updatedAt=1717910029933",
            desc: "Cool down with our Cucumber Juice, featuring crisp cucumber blended with flaxseeds for a refreshing and hydrating beverage."
          },
          {
            name: "Lime",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Lime.jpeg?updatedAt=1717910030054",
            desc: "Energize yourself with our Lime Juice, a zesty blend of tangy lime and flaxseeds for a revitalizing and vitamin-rich drink."
          },
          {
            name: "Tomato",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Tomato.jpeg?updatedAt=1717910033670",
            desc: "Replenish your body with our Tomato Juice, featuring ripe tomatoes blended with flaxseeds for a savory and nutritious beverage."
          },
          {
            name: "Melon",
            price: 28000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Melon.jpeg?updatedAt=1717910029555",
            desc: "Indulge in the sweetness of our Melon Juice, featuring juicy melons blended with flaxseeds for a refreshing and hydrating treat."
          },
          {
            name: "Pineapple",
            price: 28000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Pineapple.jpg?updatedAt=1717910032588",
            desc: "Transport yourself to the tropics with our Pineapple Juice, featuring ripe pineapples blended with flaxseeds for a tropical and vitamin-packed drink."
          },
          {
            name: "Avocado",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Avocado.jpg?updatedAt=1717910029051",
            desc: "Nourish your body with our Avocado Juice, featuring creamy avocados blended with flaxseeds for a rich and nutritious beverage."
          },
          {
            name: "Orange",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Orange.webp?updatedAt=1717910029647",
            desc: "Start your day right with our Orange Juice, featuring freshly squeezed oranges blended with flaxseeds for a vitamin C-packed and refreshing drink."
          },
          {
            name: "Watermelon",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Watermelon.jpeg?updatedAt=1717910032883",
            desc: "Beat the heat with our Watermelon Juice, featuring juicy watermelons blended with flaxseeds for a hydrating and refreshing beverage."
          },
          {
            name: "Guava",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Guava.jpeg?updatedAt=1717910029494",
            desc: "Enjoy the tropical flavors of our Guava Juice, featuring ripe guavas blended with flaxseeds for a vitamin-rich and refreshing drink."
          },
          {
            name: "Terong Belanda",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Terong%20Belanda.jpg?updatedAt=1717910032748",
            desc: "Experience the tangy flavors of our Terong Belanda Juice, featuring sour-sweet terong belanda blended with flaxseeds for a refreshing and antioxidant-rich beverage."
          },
          {
            name: "Passion Fruit",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Passiont%20Fruit.jpeg?updatedAt=1717910032143",
            desc: "Indulge in the exotic flavors of our Passion Fruit Juice, featuring tangy passion fruits blended with flaxseeds for a tropical and vitamin-packed treat."
          },
          {
            name: "Green Apple",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Green%20Apple.jpeg?updatedAt=1717910029687",
            desc: "Refresh yourself with our Green Apple Juice, featuring crisp green apples blended with flaxseeds for a refreshing and antioxidant-rich beverage."
          },
          {
            name: "Mango",
            price: 34000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Mango.jpeg?updatedAt=1717910029419",
            desc: "Savor the sweetness of our Mango Juice, featuring ripe mangoes blended with flaxseeds for a tropical and vitamin-packed drink."
          },
          {
            name: "Strawberry",
            price: 34000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Strawberry.jpg?updatedAt=1717910032580",
            desc: "Delight in the sweetness of our Strawberry Juice, featuring ripe strawberries blended with flaxseeds for a refreshing and antioxidant-rich beverage."
          },
          {
            name: "Sunkist",
            price: 34000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Sunkist.webp?updatedAt=1717910033229",
            desc: "Energize yourself with our Sunkist Juice, featuring tangy sunkist oranges blended with flaxseeds for a refreshing and vitamin C-packed drink."
          },
          {
            name: "Kiwi",
            price: 34000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Kiwi.jpeg?updatedAt=1717910029505",
            desc: "Enjoy the tartness of our Kiwi Juice, featuring ripe kiwis blended with flaxseeds for a refreshing and vitamin-rich beverage."
          },
          {
            name: "Ron88 (330ml)",
            price: 8000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Ron88.jpeg?updatedAt=1717910032780",
            desc: "Quench your thirst with Ron88, a refreshing carbonated drink blended with flaxseeds for added nutritional benefits."
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
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Lemongrass.jpeg?updatedAt=1717921333093",
            desc: "Enjoy the refreshing and citrusy flavors of Lemongrass Juice, a revitalizing blend of lemongrass infused with flaxseeds for a unique and invigorating drink."
          },
          {
            name: "Papasoy (Papaya + Soya)",
            price: 25000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Papasoy.jpeg?updatedAt=1717921334058",
            desc: "Indulge in the tropical sweetness of Papasoy Juice, featuring ripe papaya blended with creamy soya milk and flaxseeds for a nutritious and flavorful beverage."
          },
          {
            name: "Meryminty (Lime + Strawberry + Peppermint)",
            price: 28000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Meryminty.jpeg?updatedAt=1717921333165",
            desc: "Refresh yourself with Meryminty Juice, a delightful blend of tangy lime, sweet strawberries, and cool peppermint infused with flaxseeds for a refreshing and minty treat."
          },
          {
            name: "Bunny Mocktail (Carrot + Orange)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Bunny%20Mocktail.jpg?updatedAt=1717921537499",
            desc: "Energize yourself with Bunny Mocktail, featuring the vibrant flavors of carrot and orange blended together for a refreshing and nutritious beverage."
          },
          {
            name: "Cemara Asri (Sawi + Nenas + Melon)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Cemara%20Asri.jpg?updatedAt=1717921333415",
            desc: "Transport yourself to a lush garden with Cemara Asri Juice, a harmonious blend of sawi, pineapple, and melon infused with flaxseeds for a refreshing and tropical drink."
          },
          {
            name: "Kimono (Kiwi + Melon + Orange)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Kimono.jpeg?updatedAt=1717921334388",
            desc: "Experience the exotic flavors of Kimono Juice, featuring the perfect combination of kiwi, melon, and orange for a refreshing and vitamin-packed drink."
          },
          {
            name: "Double Apple (Greenapple + Pineapple)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Double%20Apple.jpeg?updatedAt=1717921333710",
            desc: "Savor the sweetness of Double Apple Juice, featuring the crisp flavors of green apple and the tropical sweetness of pineapple for a refreshing and fruity beverage."
          },
          {
            name: "Lime Sorbet (Jeruk Nipis + Kulit)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Lime%20Sorbet.jpg?updatedAt=1717921333663",
            desc: "Cool down with Lime Sorbet Juice, a zesty blend of refreshing lime and citrusy zest infused with flaxseeds for a tangy and revitalizing treat."
          },
          {
            name: "Jahe Ijo (Timun + Lime + Jahe)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Jahe%20Ijo.jpg?updatedAt=1717921334399",
            desc: "Warm up and boost your immune system with Jahe Ijo Juice, featuring the spicy kick of ginger combined with refreshing cucumber and tangy lime for a soothing and invigorating drink."
          },
          {
            name: "Sunset (Nenas + Melon + Strawberry)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Sunset.jpeg?updatedAt=1717921337212",
            desc: "Enjoy the vibrant colors and flavors of Sunset Juice, featuring the tropical sweetness of pineapple, melon, and strawberry for a refreshing and fruity beverage."
          },
          {
            name: "Orange Ginger (Orange + Melon + Jahe)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Orange%20Ginger.jpg?updatedAt=1717921334645",
            desc: "Refresh yourself with Orange Ginger Juice, a zesty blend of tangy orange, sweet melon, and spicy ginger for a refreshing and invigorating drink."
          },
          {
            name: "Martabe (Markisa + Terong Belanda)",
            price: 34000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Martabe.jpeg?updatedAt=1717921333833",
            desc: "Indulge in the tropical flavors of Marbate Juice, featuring the tartness of passion fruit and the tanginess of terong belanda for a refreshing and exotic beverage"
          },
          {
            name: "Sunrise (Sunkist + Orange + Strawberry)",
            price: 36000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Sunrise.jpg?updatedAt=1717921336991",
            desc: "Start your day right with Sunrise Juice, a vibrant blend of tangy sunkist, sweet orange, and juicy strawberry for a refreshing and vitamin-packed drink."
          },
          {
            name: "Punch (Kiwi + Melon + Orange + Markisa + Terong Belanda)",
            price: 38000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Punch.jpeg?updatedAt=1717921336312",
            desc: "Experience a burst of flavors with Punch Juice, featuring the perfect blend of kiwi, melon, orange, passion fruit, and terong belanda for a refreshing and tropical beverage."
          }
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 12,
        menuItems: [
          {
            name: "Ice Cream Cocoa",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Cocoa.png?updatedAt=1717922517703",
            desc: "Indulge your sweet tooth with our rich and creamy Ice Cream Cocoa, a delightful blend of cocoa flavors in every spoonful."
          },
          {
            name: "Ice Cream Vanilla",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Vanilla.png?updatedAt=1717922540684",
            desc: "Treat yourself to the classic flavor of our Ice Cream Vanilla, a smooth and creamy delight that never goes out of style."
          },
          {
            name: "Ice Cream Coffee",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Coffee.png?updatedAt=1717922502616",
            desc: "Get your caffeine fix with our Ice Cream Coffee, a delicious combination of creamy coffee flavors that will perk up your day."
          },
          {
            name: "Ice Cream Peppermint",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Ice%20Cream%20Peppermint.jpeg?updatedAt=1717922811734",
            desc: "Refresh your palate with our Ice Cream Peppermint, a cool and invigorating treat perfect for any occasion."
          },
          {
            name: "Brownies (Vegan)",
            price: 10000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Brownies%20(Vegan).png?updatedAt=1717922506896",
            desc: "Indulge in our decadent Vegan Brownies, a rich and fudgy dessert that's perfect for satisfying your chocolate cravings guilt-free."
          },
          {
            name: "Ice Bread Chocolate",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Ice%20Bread%20Chocolate.png?updatedAt=1717922508059",
            desc: "Experience pure bliss with our Ice Bread Chocolate, a delightful combination of fluffy bread and rich chocolate flavors."
          },
          {
            name: "Summer Brown",
            price: 28000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Summer%20Brown.png?updatedAt=1717922540279",
            desc: "Cool down with our Summer Brown dessert, a refreshing and fruity treat that captures the essence of summer in every bite."
          },
          {
            name: "Mix Ice Cream",
            price: 44000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Mix%20Ice%20Cream.png?updatedAt=1717922532530",
            desc: "Can't decide on just one flavor? Try our Mix Ice Cream and enjoy a medley of delicious flavors in every scoop."
          },
          {
            name: "Banana Split",
            price: 34000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Banana%20Split.png?updatedAt=1717922502757",
            desc: "Share the joy with our Banana Split dessert, a classic combination of bananas, ice cream, and indulgent toppings for a delightful treat."
          },
          {
            name: "Affogato with Vanilla & Coffee",
            price: 25000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Affogato.png?updatedAt=1717922504388",
            desc: "Indulge in the perfect marriage of coffee and ice cream with our Affogato, featuring creamy vanilla ice cream drowned in rich espresso."
          },
          {
            name: "Ice Cream Mocha with Chocolate & Coffee",
            price: 24000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Ice%20Cream%20Mocca%20with%20Chocolate%20&%20Coffee.png?updatedAt=1717922666610",
            desc: "Satisfy your coffee and chocolate cravings with our Ice Cream Mocha, a delightful blend of creamy ice cream infused with rich chocolate and coffee flavors."
          },
          {
            name: "Greeting Waffle",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Greeting%20Waffle.png?updatedAt=1717922537554",
            desc: "Treat yourself to our Greeting Waffle, a warm and crispy waffle served with your choice of toppings for a comforting and satisfying dessert."
          },
          {
            name: "Avocado De Coffee with Expresso",
            price: 40000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Avocado%20de%20Coffee.png?updatedAt=1717922515985",
            desc: "Indulge in the creamy goodness of Avocado De Coffee, featuring smooth avocado blended with rich espresso for a decadent and energizing treat."
          },
          {
            name: "Avocado Palm Sugar with Ice Cream",
            price: 38000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Avocado%20Palm%20Sugar.png?updatedAt=1717922499944",
            desc: "Experience a taste of paradise with our Avocado Palm Sugar dessert, featuring creamy avocado drizzled with sweet palm sugar syrup and served with a scoop of ice cream."
          },
          {
            name: "Summer Kiss with Ice Cream",
            price: 28000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Summer%20Kiss.png?updatedAt=1717922540076",
            desc: "Get a taste of summer with our Summer Kiss dessert, a refreshing combination of fruits and ice cream that's perfect for cooling off on hot days."
          },
          {
            name: "Coffee Jelly Float with Ice Cream",
            price: 26000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Coffee%20Jelly%20Float.png?updatedAt=1717922488437",
            desc: "Indulge in the perfect blend of coffee and dessert with our Coffee Jelly Float, featuring smooth coffee jelly topped with creamy ice cream for a delightful treat."
          } 
          // Tambahkan data menu lainnya jika ada
        ]
      },
      {
        categoryId: 13,
        menuItems: [
          {
            name: "Pizza Amicable Garden (Black Charcoal) 25cm / 8 slice",
            price: 60000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Amicable%20Garden.png?updatedAt=1717923231373",
            desc: "Enjoy a unique twist on traditional pizza with our Pizza Amicable Garden, featuring a black charcoal crust topped with a flavorful assortment of vegan-friendly ingredients."
          },
          {
            name: "Pizza Fortunate Garden (White) 25cm / 8 slice",
            price: 60000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Fortunate%20Garden.png?updatedAt=1717923231245",
            desc: "Delight in the heavenly flavors of our Pizza Fortunate Garden, boasting a white crust adorned with a delectable medley of vegan toppings."
          }
        ]
      },
      {
        categoryId: 14,
        menuItems:[
          {
            name: "Espresso Black (Hot)",
            price: 20000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Espresso%20Black.jpeg?updatedAt=1717924239335",
            desc: "Indulge in the bold and intense flavors of our Espresso Black, a hot beverage that packs a punch with every sip."
          },
          {
            name: "Espresso White (Hot)",
            price: 24000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Espresso%20White.jpeg?updatedAt=1717924238862",
            desc: "Savor the smooth and creamy goodness of our Espresso White, a hot coffee drink that combines the bold flavors of espresso with the velvety texture of steamed milk."
          },
          {
            name: "Black Coffee (Hot)",
            price: 22000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Black%20Coffee%20Hot.jpeg?updatedAt=1717924239434",
            desc: "Wake up your senses with our classic Black Coffee, a hot beverage that delivers a bold and robust coffee flavor without any added frills."
          },
          {
            name: "Black Coffee (Cold)",
            price: 24000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Black%20Coffee%20Cold.jpeg?updatedAt=1717924239255",
            desc: "Cool down with our refreshing Cold Black Coffee, a chilled beverage that retains the bold and intense flavors of traditional black coffee."
          },
          {
            name: "Soy Coffee (Hot)",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soy%20Coffee%20Hot.jpg?updatedAt=1717924244959",
            desc: "Enjoy the rich and creamy flavors of our Soy Coffee, a hot beverage made with steamed soy milk and espresso."
          },
          {
            name: "Soy Latte (Hot)",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soy%20Latte%20Hot.jpeg?updatedAt=1717924244807",
            desc: "Indulge in the smooth and velvety texture of our Soy Latte, a hot coffee drink made with steamed soy milk and a shot of espresso."
          },
          {
            name: "Soy Cappucino (Hot)",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soy%20Cappucino%20Hot.jpeg?updatedAt=1717924239158",
            desc: "Treat yourself to the frothy goodness of our Soy Cappuccino, a hot coffee beverage topped with velvety foam made from steamed soy milk."
          },
          {
            name: "Soy Coffee (Cold)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soy%20Coffee%20Cold.jpeg?updatedAt=1717924242652",
            desc: "Refresh yourself with our chilled Soy Coffee, a cold beverage made with soy milk and espresso over ice."
          },
          {
            name: "Soy Latte (Cold)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soy%20Latte%20Cold.jpeg?updatedAt=1717924244710",
            desc: "Cool down with our refreshing Cold Soy Latte, a creamy and delicious coffee drink made with soy milk and espresso over ice."
          },
          {
            name: "Soy Cappucino (Cold)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soy%20Cappucino%20Cold.png?updatedAt=1717924240842",
            desc: "Enjoy the creamy goodness of our Cold Soy Cappuccino, a refreshing coffee beverage made with soy milk and espresso, topped with frothy foam."
          },
          {
            name: "Soy Mocha (Hot)",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soy%20Mocha%20Hot.jpg?updatedAt=1717924250462",
            desc: "Indulge in the irresistible combination of chocolate and coffee with our Soy Mocha, a hot beverage made with soy milk, espresso, and rich chocolate syrup."
          },
          {
            name: "Soy Mocha (Cold)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soy%20Mocha%20Cold.jpeg?updatedAt=1717924245567",
            desc: "Chill out with our refreshing Cold Soy Mocha, a delicious coffee drink made with soy milk, espresso, and chocolate syrup served over ice."
          },
          {
            name: "Soy Cocoa (Hot)",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soy%20Cocoa%20Hot.jpeg?updatedAt=1717924245543",
            desc: "Warm up with our comforting Soy Cocoa, a hot beverage made with steamed soy milk and rich cocoa powder."
          },
          {
            name: "Soy Cocoa (Cold)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soy%20Cocoa%20Cold.jpeg?updatedAt=1717924240266",
            desc: "Quench your thirst with our refreshing Cold Soy Cocoa, a chilled beverage made with soy milk and cocoa powder served over ice."
          },
          {
            name: "Soy Matcha (Hot)",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soy%20Matcha%20Hot.jpeg?updatedAt=1717924245339",
            desc: "Experience the harmonious combination of earthy matcha and creamy soy milk with our Soy Matcha, a hot beverage that's both soothing and invigorating."
          },
          {
            name: "Soy Matcha (Cold)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soy%20Match%20Cold.jpg?updatedAt=1717924245354",
            desc: "Cool down with our refreshing Cold Soy Matcha, a chilled beverage made with soy milk and matcha powder served over ice."
          },
          {
            name: "Chocolate (Hot)",
            price: 30000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Chocolate%20Hot.jpeg?updatedAt=1717924238974",
            desc: "Indulge in the rich and velvety flavors of our Hot Chocolate, a comforting beverage made with rich cocoa powder and steamed milk."
          },
          {
            name: "Chocolate (Cold)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Chocolate%20Cold.jpeg?updatedAt=1717924239612",
            desc: "Chill out with our refreshing Cold Chocolate, a delicious beverage made with cocoa powder and milk served over ice."
          },
          {
            name: "Soya (Hot)",
            price: 20000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soya%20Hot.jpeg?updatedAt=1717924256425",
            desc: "Enjoy the simplicity of our Soya, a hot beverage made with soy milk for a dairy-free and cholesterol-free alternative to traditional milk."
          },
          {
            name: "Soya (Cold)",
            price: 20000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Soya%20Cold.jpeg?updatedAt=1717924254216",
            desc: "Cool down with our refreshing Cold Soya, a chilled beverage made with soy milk for a dairy-free and cholesterol-free alternative to traditional milk."
          }
        ]
      },
      {
        categoryId: 15,
        menuItems:[
          {
            name: "Banana Milkshake (Soya with Cranberry & Pumpkin Seed)",
            price: 32000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Banana%20Milkshake.png?updatedAt=1717923424428",
            desc: "Indulge in the creamy goodness of our Banana Milkshake, made with soy milk for a dairy-free option, and blended with cranberries and pumpkin seeds for a nutritious twist."
          },
          {
            name: "Casual Elegant (Soya with Ice Fortunate Coffee)",
            price: 35000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Casual%20Elegant.png?updatedAt=1717923424442",
            desc: "Experience the perfect blend of sophistication and indulgence with our Casual Elegant beverage. Made with soy milk and served over ice, infused with the rich flavors of Fortunate Coffee."
          },
          {
            name: "Sour Happy Orange",
            price: 36000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Sour%20Happy%20Orange.png?updatedAt=1717923422073",
            desc: "Refresh your palate with our Sour Happy Orange drink, a zesty and invigorating blend of fresh orange juice that's sure to put a smile on your face."
          },
          {
            name: "Sour Happy Strawberry",
            price: 36000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Sour%20Happy%20Strawberry.png?updatedAt=1717923423140",
            desc: "Satisfy your sweet tooth with our Sour Happy Strawberry beverage, bursting with the irresistible flavor of ripe strawberries. Made with real fruit and served chilled."
          },
          {
            name: "Coffee Breeze",
            price: 36000,
            image: "https://ik.imagekit.io/fndsjy/Fortunate_Coffee/Menu/Coffee%20Breeze.png?updatedAt=1717923421422",
            desc: "Cool down with our Coffee Breeze drink, a refreshing combination of chilled coffee and creamy soy milk. Perfect for coffee enthusiasts."
          }
        ]
      }
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
