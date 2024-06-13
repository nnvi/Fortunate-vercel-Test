const ApplicationController = require('./ApplicationController');

class DetailOrderController extends ApplicationController {
  constructor({ foodIngredientsModel, menuIngredientsModel, orderModel, detailOrderModel, detailFoodIngredientsModel }) {
    super();
    this.foodIngredientsModel = foodIngredientsModel;
    this.menuIngredientsModel = menuIngredientsModel;
    this.orderModel = orderModel;
    this.detailOrderModel = detailOrderModel;
    this.detailFoodIngredientsModel = detailFoodIngredientsModel;
  }

  handleCreateDetailOrder = async (req, res) => {
    const transaction = await this.detailOrderModel.sequelize.transaction();
    
    try {
      const { order_id, menus } = req.body;

      const order = await this.orderModel.findByPk(order_id);
      if (!order) {
        return res.status(404).json({ error: { message: "Order not found." } });
      }

      let lowStockAlerts = [];

      for (const { menu_id, detail_order_qty, detail_order_notes } of menus) {
        const menuIngredients = await this.menuIngredientsModel.findAll({
          where: { menu_id: menu_id },
          include: [{ model: this.foodIngredientsModel }]
        });

        if (!menuIngredients.length) {
          return res.status(404).json({ error: { message: `Menu Ingredients for menu ID ${menu_id} not found.` } });
        }

        for (const menuIngredient of menuIngredients) {
          const requiredStock = detail_order_qty * menuIngredient.menu_ingredients_qty;
          const foodIngredientArray = menuIngredient.food_ingredients;
          console.log(foodIngredientArray);

          if (!foodIngredientArray || !foodIngredientArray.length) {
            return res.status(404).json({ error: { message: `Food Ingredients not found for menu ID ${menu_id}.` } });
          }

          for (const foodIngredient of foodIngredientArray) {
          console.log("Detail Order Quantity: ", detail_order_qty);
          console.log("Menu Ingredients Quantity: ", menuIngredient.menu_ingredients_qty);
          console.log("Required Stock: ", requiredStock);
          console.log("Food Ingredient: ", foodIngredient);

          if(detail_order_qty <= 0) {
            return res.status(404).json({ error: { message: `Your qty menu must be at least 1 to order.` } });
          }

          if (!foodIngredient) {
            return res.status(404).json({ error: { message: `Food Ingredients not found for menu ID ${menu_id}.` } });
          }

          if (foodIngredient.food_ingredients_stock - requiredStock < 0) {
            return res.status(422).json({
              error: { message: `Insufficient stock for ${foodIngredient.food_ingredients_name}.` },
              lowStockAlerts: lowStockAlerts
            });
          }

          if (foodIngredient.food_ingredients_stock - requiredStock <= 5) {
            lowStockAlerts.push(`Stock for ${foodIngredient.food_ingredients_name} is running low.`);
          }

          // Reduce stock of food ingredients
          await this.foodIngredientsModel.decrement('food_ingredients_stock', {
            by: requiredStock,
            where: { food_ingredients_id: foodIngredient.food_ingredients_id },
            transaction
          });

          // Create detail order entry
          await this.detailOrderModel.create({
            order_id: order_id,
            menu_id: menu_id,
            detail_order_qty: detail_order_qty,
            detail_order_notes: detail_order_notes
          }, { transaction });

          // Create detail food ingredients entry with type "Out"
          await this.detailFoodIngredientsModel.create({
            food_ingredients_id: foodIngredient.food_ingredients_id,
            detail_food_ingredients_qty: requiredStock,
            detail_food_ingredients_type: 'Out'
          }, { transaction });
          }
        }
      }

      await transaction.commit();

      res.status(201).json({ message: "Order successfully created.", lowStockAlerts });
    } catch (error) {
      await transaction.rollback();
      res.status(422).json({
        error: {
          name: error.name,
          message: error.message
        }
      });
    }
  }

  handleGetDetailOrder = async (req, res) => {
    const detailOrder = await this.getDetailOrderFromRequest(req);
    res.status(200).json(detailOrder);
  }

  handleListDetailOrder = async (req, res) => {
    const detailOrder = await this.detailOrderModel.findAll()
    res.status(200).json(detailOrder)
  }

  getDetailOrderFromRequest(req) {
    return this.detailOrderModel.findByPk(req.params.id);
  }

  handleGetDetailOrderByOrderID = async (req, res) => {
    try {
      const { order_id } = req.params;
  
      const detailOrder = await this.detailOrderModel.findAll({
        where: { order_id: order_id },
        include: [
          {
            model: this.orderModel,
          }
        ]
      });
  
      res.status(200).json(detailOrder);
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

module.exports = DetailOrderController;
