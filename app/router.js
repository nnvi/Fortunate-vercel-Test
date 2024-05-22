const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
  ApplicationController,
  AuthenticationController,
  CategoryController,
  MenuController,
  FoodIngredientsController,
  DetailFoodIngredientsController,
  MenuIngredientsController,
  OrderController,
  DetailOrderController
} = require("./controllers");

const { 
  user_acc,
  category,
  menu,
  food_ingredients,
  detail_food_ingredients,
  menu_ingredients,
  order,
  detail_order
} = require("./models");

function apply(app) {
  const userModel = user_acc;
  const categoryModel = category;
  const menuModel = menu;
  const foodIngredientsModel = food_ingredients;
  const detailFoodIngredientsModel = detail_food_ingredients;
  const menuIngredientsModel = menu_ingredients;
  const orderModel = order;
  const detailOrderModel = detail_order;

  const applicationController = new ApplicationController();
  const authenticationController = new AuthenticationController({ bcrypt, jwt, userModel });
  const accessControl = authenticationController.accessControl;
  const categoryController = new CategoryController({ categoryModel });
  const menuController = new MenuController({ categoryModel, menuModel });
  const foodIngredientsController = new FoodIngredientsController({ foodIngredientsModel });
  const detailFoodIngredientsController = new DetailFoodIngredientsController({ foodIngredientsModel, detailFoodIngredientsModel });
  const menuIngredientsController = new MenuIngredientsController({ menuModel, foodIngredientsModel, menuIngredientsModel });
  const orderController = new OrderController({ userModel, orderModel });
  const detailOrderController = new DetailOrderController({ foodIngredientsModel, menuIngredientsModel, orderModel, detailOrderModel });

  // Root route
  app.get("/", applicationController.handleGetRoot);

  // Auth routes
  app.post("/v1/auth/login", authenticationController.handleLogin);
  app.get("/v1/auth/whoami", authenticationController.authorize(accessControl.OWNER), authenticationController.handleGetUser);

  // Middleware to authorize multiple roles
  const authorizeRoles = (roles) => {
    return (req, res, next) => {
      for (let role of roles) {
        authenticationController.authorize(role)(req, res, () => {});
      }
      next();
    };
  };

  // Category routes
  app.route("/api/v1/category")
    .post(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), categoryController.handleCreateCategory)
    .get(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), categoryController.handleListCategory);

  app.route("/api/v1/category/:id")
    .get(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), categoryController.handleGetCategory)
    .put(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), categoryController.handleUpdateCategory)
    .delete(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), categoryController.handleDeleteCategory);

  // Menu routes
  app.route("/api/v1/menu")
    .post(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), menuController.handleCreateMenu)
    .get(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), menuController.handleListMenu);

  app.route("/api/v1/menu/:id")
    .get(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), menuController.handleGetMenu)
    .put(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), menuController.handleUpdateMenu)
    .delete(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), menuController.handleDeleteMenu);

  // Food Ingredients routes
  app.route("/api/v1/food-ingredients")
    .post(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), foodIngredientsController.handleCreateFoodIngredients)
    .get(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), foodIngredientsController.handleListFoodIngredients);

  app.route("/api/v1/food-ingredients/:id")
    .get(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), foodIngredientsController.handleGetFoodIngredients)
    .put(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), foodIngredientsController.handleUpdateFoodIngredients)
    .delete(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), foodIngredientsController.handleDeleteFoodIngredients);

  // Detail Food Ingredients routes
  app.route("/api/v1/type-food-ingredients")
    .post(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), detailFoodIngredientsController.handleCreateDetailFoodIngredients)
    .get(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), detailFoodIngredientsController.handleListDetailFoodIngredients);

  app.route("/api/v1/type-food-ingredients/:id")
    .get(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), detailFoodIngredientsController.handleGetDetailFoodIngredients);

  // Menu Ingredients routes
  app.route("/api/v1/menu-ingredients")
    .post(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), menuIngredientsController.handleCreateMenuIngredients)
    .get(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), menuIngredientsController.handleListMenuIngredients);

  app.route("/api/v1/menu-ingredients/:id")
    .get(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), menuIngredientsController.handleGetMenuIngredients);

  app.route("/api/v1/menu-ingredients/:menu_id/ingredients")
    .get(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), menuIngredientsController.handleGetMenuIngredientsByMenuID)
    .put(authorizeRoles([accessControl.OWNER, accessControl.ADMIN]), menuIngredientsController.handleUpdateMenuIngredients);

  // Order routes
  app.route("/api/v1/order")
    .post(authorizeRoles([accessControl.OWNER, accessControl.CASHIER]), orderController.handleCreateOrder)
    .get(authorizeRoles([accessControl.OWNER, accessControl.CASHIER]), orderController.handleListOrder);

  app.route("/api/v1/order/:id")
    .get(authorizeRoles([accessControl.OWNER, accessControl.CASHIER]), orderController.handleGetOrder)
    .put(authorizeRoles([accessControl.OWNER, accessControl.CASHIER]), orderController.handleUpdateOrder)
    .delete(authorizeRoles([accessControl.OWNER, accessControl.CASHIER]), orderController.handleDeleteScheduledOrder);

  // Detail Order routes
  app.route("/api/v1/detail-order")
    .post(authorizeRoles([accessControl.OWNER, accessControl.CASHIER]), detailOrderController.handleCreateDetailOrder)
    .get(authorizeRoles([accessControl.OWNER, accessControl.CASHIER]), detailOrderController.handleListDetailOrder);

  app.route("/api/v1/detail-order/:id")
    .get(authorizeRoles([accessControl.OWNER, accessControl.CASHIER]), detailOrderController.handleGetDetailOrder);

  app.route("/api/v1/detail-order/:order_id/order")
    .get(authorizeRoles([accessControl.OWNER, accessControl.CASHIER]), detailOrderController.handleGetDetailOrderByOrderID);

  // Error handling
  app.use(applicationController.handleNotFound);
  app.use(applicationController.handleError);

  return app;
}

module.exports = { apply }
