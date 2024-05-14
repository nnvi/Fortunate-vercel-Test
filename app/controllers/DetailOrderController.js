const ApplicationController = require('./ApplicationController');

class DetailOrderController extends ApplicationController {
  constructor({ foodIngredientsModel, menuIngredientsModel, orderModel, detailOrderModel }) {
    super();
    this.foodIngredientsModel = foodIngredientsModel;
    this.menuIngredientsModel = menuIngredientsModel;
    this.orderModel = orderModel;
    this.detailOrderModel = detailOrderModel;
  }

  handleCreateDetailOrder = async (req, res) => {
    try {
      const { order_id, menus } = req.body;

      const order = await this.orderModel.findByPk(order_id);
      if (!order) {
        return res.status(404).json({ error: { message: "Order not found." } });
      }
  
      for (const { menu_id, detail_order_qty, detail_order_notes } of menus) {
        const menuIngredients = await this.menuIngredientsModel.findAll({
          where: { menu_id: menu_id },
          include: [{ model: this.foodIngredientsModel }]
        });

        if (!menuIngredients) {
          return res.status(404).json({ error: { message: `Menu Ingredients for menu ID ${menu_id} not found.` } });
        }

        for (const menuIngredient of menuIngredients) {
          // console.log(menuIngredients); // Akses dataValues dari menuIngredient
          const requiredStock = detail_order_qty * menuIngredient.dataValues.menu_ingredients_qty;
          const foodIngredients = menuIngredient.dataValues;

          console.log("required stock", requiredStock);
          console.log("food", foodIngredients.food_ingredients_id);

          if (foodIngredients && foodIngredients.food_ingredients_id) {
              if (foodIngredients.food_ingredients_stock - requiredStock <= 5) {
                console.log(`Alert: Stock for ${foodIngredients.food_ingredients_name} is running low.`);
              }
      
              if (foodIngredients.food_ingredients_stock - requiredStock < 0) {
                return res.status(422).json({ error: { message: `Insufficient stock for ${foodIngredients.food_ingredients_name}.` } });
              }
      
              // Kurangi stok bahan makanan
              await this.foodIngredientsModel.decrement('food_ingredients_stock', { by: requiredStock, where: { food_ingredients_id: foodIngredients.food_ingredients_id } });
            } else {
              return res.status(404).json({ error: { message: `Food Ingredients not found for menu ID ${menu_id}.` } });
          }
        }
      }
  
      res.status(201).json({ message: "Order successfully created." });
    } catch (error) {
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
        where: { order_id: order_id }
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
