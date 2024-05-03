const ApplicationController = require('./ApplicationController');

class FoodIngredientsController extends ApplicationController {
  constructor({ foodIngredientsModel }) {
    super();
    this.foodIngredientsModel = foodIngredientsModel;
  }

  handleCreateFoodIngredients = async (req, res) => {
    try {
      const {
        food_ingredients_name,
        food_ingredients_qty,
        food_ingredients_type
      } = req.body;
   
      // Cek apakah sudah ada bahan makanan dengan nama yang sama
      const existingIngredient = await this.foodIngredientsModel.findOne({
        where: {
          food_ingredients_name: food_ingredients_name
        },
        order: [['createdAt', 'DESC']]
      });

      if (existingIngredient) {
        let finalType;
        // Jika tipe adalah '0', maka finalType adalah 0, jika '1', maka finalType adalah 1
        if (food_ingredients_type === '0') {
          finalType = '0';
        } else if (food_ingredients_type === '1') {
          finalType = '1';
        } else {
          return res.status(400).json({ error: { message: "Invalid type parameter." } });
        }

        // Update nilai qty dan type pada existingIngredient
        existingIngredient.food_ingredients_name = food_ingredients_name;
        existingIngredient.food_ingredients_qty = food_ingredients_qty;
        existingIngredient.food_ingredients_type = finalType;

        // Jika ada, tambahkan atau kurangi stok sesuai tipe
        if (finalType === '0') {
          existingIngredient.food_ingredients_stock -= food_ingredients_qty;
        } else if (finalType === '1') {
          existingIngredient.food_ingredients_stock += food_ingredients_qty;
        }

        // Jika tipe baru adalah out (0) dan jumlah yang dimasukkan lebih besar dari stok yang tersedia, kirimkan respons kesalahan
        if (food_ingredients_type === '0' && food_ingredients_qty > existingIngredient.food_ingredients_stock) {
            return res.status(422).json({
              error: {
                message: "Jumlah barang keluar melebihi stok yang tersedia."
              }
            });
          }
          
        // Simpan perubahan
        const existing_food_ingredients = await this.foodIngredientsModel.create({
          food_ingredients_name: existingIngredient.food_ingredients_name,
          food_ingredients_qty: existingIngredient.food_ingredients_qty,
          food_ingredients_stock: existingIngredient.food_ingredients_stock,
          food_ingredients_type: existingIngredient.food_ingredients_type
        })
        // Return response dengan bahan makanan yang telah diupdate
        res.status(200).json(existing_food_ingredients);
      } else {
        // Jika belum ada, buat bahan makanan baru
        const food_ingredients = await this.foodIngredientsModel.create({
          food_ingredients_name,
          food_ingredients_qty,
          food_ingredients_stock: food_ingredients_type === '1' ? food_ingredients_qty: food_ingredients_qty,
          food_ingredients_type: '1'
        });
        // Return response dengan bahan makanan yang dibuat
        res.status(201).json(food_ingredients);
      }
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      });
    }
  }

  handleGetFoodIngredients = async (req, res) => {
    const food_ingredients = await this.getFoodIngredientsFromRequest(req);

    res.status(200).json(food_ingredients);
  }

  handleGetFoodIngredientsByType = async (req, res) => {
    try {
      const { type } = req.params;
  
      let foodIngredients;
      // Jika tipe adalah "stock", ambil data terakhir dari setiap barang
      if (type === 'stock') {
        // Menggunakan Sequelize untuk mengambil data terbaru berdasarkan nama barang
        foodIngredients = await this.foodIngredientsModel.findAll({
        attributes: ['food_ingredients_name', 'food_ingredients_stock', 'createdAt'],
        group: ['food_ingredients_name', 'food_ingredients_stock', 'createdAt'],
        order: [['food_ingredients_name', 'ASC'], ['createdAt', 'DESC']]
      });
      } else {
        // Jika tipe adalah "in" atau "out", ambil data sesuai dengan tipe yang diminta
        const typeValue = type === 'in' ? '1' : (type === 'out' ? '0' : null);
        if (!typeValue) {
          return res.status(400).json({ error: { message: "Invalid type parameter." } });
        }
        foodIngredients = await this.foodIngredientsModel.findAll({
          where: {
            food_ingredients_type: typeValue
          }
        });
      }
  
      res.status(200).json(foodIngredients);
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      });
    }
  }

  handleListFoodIngredients = async (req, res) => {
    const food_ingredients = await this.foodIngredientsModel.findAll()

    res.status(200).json(food_ingredients)
  }

  getFoodIngredientsFromRequest(req) {
    return this.foodIngredientsModel.findByPk(req.params.id);
  }
}

module.exports = FoodIngredientsController;