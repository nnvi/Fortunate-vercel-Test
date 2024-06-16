const ApplicationController = require('./ApplicationController');

class MenuIngredientsController extends ApplicationController {
  constructor({ menuModel, foodIngredientsModel, menuIngredientsModel }) {
    super();
    this.menuModel = menuModel;
    this.foodIngredientsModel = foodIngredientsModel;
    this.menuIngredientsModel = menuIngredientsModel;
  }

  handleCreateMenuIngredients = async (req, res) => {
    try {
      const { menu_id, ingredients } = req.body;
  
      // Pastikan menuId ada
      const menu = await this.menuModel.findByPk(menu_id);
      if (!menu) {
        return res.status(404).json({ error: { message: "Menu not found." } });
      }
  
      // Simpan semua food ingredients yang sudah ditemukan
      const existingFoodIngredients = new Set();
  
      // Simpan semua menuIngredients dalam array
      const createdMenuIngredients = [];
      for (const { food_ingredients_id, menu_ingredients_qty } of ingredients) {
        // Periksa apakah food ingredient sudah ada
        if (existingFoodIngredients.has(food_ingredients_id)) {
          return res.status(422).json({ error: { message: "Duplicate food ingredient found in the list." } });
        }
  
        existingFoodIngredients.add(food_ingredients_id);
  
        const foodIngredient = await this.foodIngredientsModel.findByPk(food_ingredients_id);
        if (!foodIngredient) {
          return res.status(404).json({ error: { message: `Food ingredients ${food_ingredients_id} not found.` } });
        }
  
        const menuIngredient = await this.menuIngredientsModel.create({
          menu_id,
          food_ingredients_id,
          menu_ingredients_qty
        });
  
        createdMenuIngredients.push(menuIngredient);
      }
  
      res.status(201).json(createdMenuIngredients);
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      });
    }
  }

  handleGetMenuIngredients = async (req, res) => {
    const menu_ingredients = await this.getMenuIngredientsFromRequest(req);
    res.status(200).json(menu_ingredients);
  }

  handleUpdateMenuIngredients = async (req, res) => {
    try {
      const { ingredients } = req.body;
      const menu_id = req.params.menu_id;

      // Pastikan menuId ada
      const menu = await this.menuModel.findByPk(menu_id);
      if (!menu) {
        return res.status(404).json({ error: { message: "Menu not found." } });
      }

      // Simpan semua food ingredients yang sudah ditemukan dalam data baru
      const newFoodIngredients = new Set();
      for (const item of ingredients) {
        if (newFoodIngredients.has(item.food_ingredients_id)) {
          return res.status(422).json({ error: { message: "Duplicate food ingredient found in the list." } });
        }
        newFoodIngredients.add(item.food_ingredients_id);
      }

      // Ambil semua menu ingredients yang terkait dengan menuId dari database
      const existingMenuIngredients = await this.menuIngredientsModel.findAll({
        where: { menu_id: menu_id }
      });

      // Simpan semua menu ingredients yang telah diperbarui
      const updatedMenuIngredients = [];

      // Lakukan iterasi pada menu ingredients yang ada di database
      for (const menuIngredient of existingMenuIngredients) {
        const matchingItem = ingredients.find(item => item.food_ingredients_id === menuIngredient.food_ingredients_id);
        if (matchingItem) {
          // Update existing ingredient
          await menuIngredient.update({
            menu_ingredients_qty: matchingItem.menu_ingredients_qty
          });
          updatedMenuIngredients.push(menuIngredient);
          newFoodIngredients.delete(menuIngredient.food_ingredients_id);
        } else {
          // Delete ingredient not in the new list
          await menuIngredient.destroy();
        }
      }

      // Add new ingredients
      for (const { food_ingredients_id, menu_ingredients_qty } of ingredients) {
        if (!existingMenuIngredients.some(menuIngredient => menuIngredient.food_ingredients_id === food_ingredients_id)) {
          const foodIngredient = await this.foodIngredientsModel.findByPk(food_ingredients_id);
          if (!foodIngredient) {
            return res.status(404).json({ error: { message: `Food ingredients ${food_ingredients_id} not found.` } });
          }

          const menuIngredient = await this.menuIngredientsModel.create({
            menu_id,
            food_ingredients_id,
            menu_ingredients_qty
          });
          updatedMenuIngredients.push(menuIngredient);
        }
      }

      res.status(200).json(updatedMenuIngredients);
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      });
    }
  }

  handleListMenuIngredients = async (req, res) => {
    const menu_ingredients = await this.menuIngredientsModel.findAll()
    res.status(200).json(menu_ingredients)
  }

  getMenuIngredientsFromRequest(req) {
    return this.menuIngredientsModel.findByPk(req.params.id);
  }

  handleGetMenuIngredientsByMenuID = async (req, res) => {
    try {
      const { menu_id } = req.params;
  
      // Cari menuIngredients berdasarkan menu_id
      const menuIngredients = await this.menuIngredientsModel.findAll({
        where: { menu_id: menu_id }
      });
  
      // Kirim data sebagai respons
      res.status(200).json(menuIngredients);
    } catch (error) {
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      });
    }
  }

}

module.exports = MenuIngredientsController;