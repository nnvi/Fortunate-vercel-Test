//const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
   ApplicationController,
   AuthenticationController,
   CategoryController,
   MenuController,
   FoodIngredientsController,
   DetailFoodIngredientsController,
  } = require("./controllers");

const { 
  admin_acc,
  category,
  menu,
  food_ingredients,
  detail_food_ingredients,
} = require("./models");

function apply(app) {
  const adminModel = admin_acc;
  const categoryModel = category;
  const menuModel = menu;
  const foodIngredientsModel = food_ingredients;
  const detailFoodIngredientsModel = detail_food_ingredients;

  const applicationController = new ApplicationController();
  const authenticationController = new AuthenticationController({ bcrypt, jwt, adminModel });
  const categoryController = new CategoryController({ categoryModel });
  const menuController = new MenuController({ categoryModel, menuModel });
  const foodIngredientsController = new FoodIngredientsController({ foodIngredientsModel });
  const detailFoodIngredientsController = new DetailFoodIngredientsController({ foodIngredientsModel, detailFoodIngredientsModel });
  
  app.get("/", applicationController.handleGetRoot);

  app.post("/v1/auth/login", authenticationController.handleLogin);

  app.post("/api/v1/new-category", categoryController.handleCreateCategory);
  app.get("/api/v1/category", categoryController.handleListCategory);
  app.get("/api/v1/category/:id", categoryController.handleGetCategory);
  app.put("/api/v1/category/:id", categoryController.handleUpdateCategory);
  app.delete("/api/v1/category/:id", categoryController.handleDeleteCategory);

  app.post("/api/v1/new-menu", menuController.handleCreateMenu);
  app.get("/api/v1/menu", menuController.handleListMenu);
  app.get("/api/v1/menu/:id", menuController.handleGetMenu);
  app.put("/api/v1/menu/:id", menuController.handleUpdateMenu);
  app.delete("/api/v1/menu/:id", menuController.handleDeleteMenu);

  app.post("/api/v1/new-food-ingredients", foodIngredientsController.handleCreateFoodIngredients);
  app.get("/api/v1/food-ingredients", foodIngredientsController.handleListFoodIngredients);
  app.get("/api/v1/food-ingredients/:id", foodIngredientsController.handleGetFoodIngredients);
  app.put("/api/v1/food-ingredients/:id", foodIngredientsController.handleUpdateFoodIngredients);
  app.delete("/api/v1/food-ingredients/:id", foodIngredientsController.handleDeleteFoodIngredients);

  app.post("/api/v1/type-food-ingredients", detailFoodIngredientsController.handleCreateDetailFoodIngredients);
  app.get("/api/v1/type-food-ingredients", detailFoodIngredientsController.handleListDetailFoodIngredients);
  app.get("/api/v1/type-food-ingredients/:id", detailFoodIngredientsController.handleGetDetailFoodIngredients);

  app.use(applicationController.handleNotFound);
  app.use(applicationController.handleError);

  return app;
}

module.exports = { apply }