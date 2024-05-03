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
    const foodIngredients = await this.getFoodIngredientsFromRequest(req);

    res.status(200).json(foodIngredients);
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
    const foodIngredients = await this.foodIngredientsModel.findAll()

    res.status(200).json(foodIngredients)
  }

  getFoodIngredientsFromRequest(req) {
    return this.foodIngredientsModel.findByPk(req.params.id);
  }
}

module.exports = FoodIngredientsController;