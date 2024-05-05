const ApplicationController = require('./ApplicationController');

class DetailFoodIngredientsController extends ApplicationController {
  constructor({ foodIngredientsModel, detailFoodIngredientsModel }) {
    super();
    this.detailFoodIngredientsModel = detailFoodIngredientsModel;
    this.foodIngredientsModel = foodIngredientsModel;
  }

  handleCreateDetailFoodIngredients = async (req, res) => {
    try {
      const {
        food_ingredients_id,
        detail_food_ingredients_qty,
        detail_food_ingredients_type
      } = req.body;
  
      const foodIngredient = await this.foodIngredientsModel.findOne({
        where: { food_ingredients_id: food_ingredients_id }
      });
  
      if (!foodIngredient) {
        return res.status(404).json({ error: { message: "Food ingredient not found." } });
      }
  
      // Jika tipe adalah "in", tambahkan stok, jika "out", kurangi stok
      if (detail_food_ingredients_type === 'In') {
        foodIngredient.food_ingredients_stock += detail_food_ingredients_qty;
      } else if (detail_food_ingredients_type === 'Out') {
        // Jika tipe keluar, pastikan stok mencukupi
        if (foodIngredient.food_ingredients_stock < detail_food_ingredients_qty) {
          return res.status(422).json({
            error: {
              message: "Jumlah barang keluar melebihi stok yang tersedia."
            }
          });
        }
        foodIngredient.food_ingredients_stock -= detail_food_ingredients_qty;
      } else {
        return res.status(400).json({ error: { message: "Invalid type parameter." } });
      }
  
      // Simpan perubahan pada bahan makanan
      await foodIngredient.save();
  
      // Buat detail bahan makanan
      const detailFoodIngredient = await this.detailFoodIngredientsModel.create({
        food_ingredients_id,
        detail_food_ingredients_qty,
        detail_food_ingredients_type
      });
  
      res.status(201).json(detailFoodIngredient);
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      });
    }
  }

  handleGetDetailFoodIngredients = async (req, res) => {
    const food_ingredients = await this.getDetailFoodIngredientsFromRequest(req);
    res.status(200).json(food_ingredients);
  }

  handleListDetailFoodIngredients = async (req, res) => {
    const food_ingredients = await this.detailFoodIngredientsModel.findAll()
    res.status(200).json(food_ingredients)
  }

  getDetailFoodIngredientsFromRequest(req) {
    return this.detailFoodIngredientsModel.findByPk(req.params.id);
  }
}

module.exports = DetailFoodIngredientsController;