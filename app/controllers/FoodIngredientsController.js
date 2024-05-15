const ApplicationController = require('./ApplicationController');

class FoodIngredientsController extends ApplicationController {
  constructor({ foodIngredientsModel }) {
    super();
    this.foodIngredientsModel = foodIngredientsModel;
  }

  handleCreateFoodIngredients = async (req, res) => {
    try {
      const {
        food_ingredients_id,
        food_ingredients_name,
        food_ingredients_stock
      } = req.body;

      if (food_ingredients_stock <= 1) {
        return res.status(422).json({
          error: {
            message: "Stock tidak boleh kurang dari 1"
          }
        });
      }

      const foodIngredients = await this.foodIngredientsModel.create({
        food_ingredients_id,
        food_ingredients_name,
        food_ingredients_stock
      });

      res.status(201).json(foodIngredients);
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      })
    }
  }

  handleGetFoodIngredients = async (req, res) => {
    try {
      const foodIngredients = await this.getFoodIngredientsFromRequest(req);
      const alert = foodIngredients.food_ingredients_stock <= 5
        ? `Stock for ${foodIngredients.food_ingredients_name} is running low.`
        : null;

      const response = { ...foodIngredients.toJSON(), alert }; // Menambahkan alert ke dalam objek foodIngredients
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({
        error: {
          name: error.name,
          message: error.message
        }
      });
    }
  }

  handleUpdateFoodIngredients = async (req, res) => {
    try {
      const {
        food_ingredients_id,
        food_ingredients_name,
        food_ingredients_stock
      } = req.body;

      if (food_ingredients_stock <= 1) {
        return res.status(422).json({
          error: {
            message: "Stock tidak boleh kurang dari 1"
          }
        });
      }

      const foodIngredients = await this.getFoodIngredientsFromRequest(req);

      await foodIngredients.update({
        food_ingredients_id,
        food_ingredients_name,
        food_ingredients_stock
      });

      res.status(200).json(foodIngredients);
    } catch (err) {
      res.status(422).json({
        error: {
          name: err.name,
          message: err.message,
        }
      });
    }
  }

  handleDeleteFoodIngredients = async (req, res) => {
    const foodIngredients = await this.getFoodIngredientsFromRequest(req);
    await foodIngredients.destroy();
    res.status(204).json(foodIngredients).end();
  }

  handleListFoodIngredients = async (req, res) => {
    try {
      const foodIngredients = await this.foodIngredientsModel.findAll();

      const response = foodIngredients.map(fi => {
        const alert = fi.food_ingredients_stock <= 5
          ? `Stock for ${fi.food_ingredients_name} is running low.`
          : null;
        return { ...fi.toJSON(), alert }; // Menambahkan alert ke dalam objek foodIngredients
      });

      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({
        error: {
          name: error.name,
          message: error.message
        }
      });
    }
  }

  getFoodIngredientsFromRequest(req) {
    return this.foodIngredientsModel.findByPk(req.params.id);
  }
}

module.exports = FoodIngredientsController;