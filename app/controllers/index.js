const ApplicationController = require("./ApplicationController");
const AuthenticationController = require("./AuthenticationController");
const CategoryController = require("./CategoryController");
const DetailFoodIngredientsController = require("./DetailFoodIngredientsController");
const FoodIngredientsController = require("./FoodIngredientsController");
const MenuController = require("./MenuController");
const MenuIngredientsController = require("./MenuIngredientsController");

module.exports = {
  ApplicationController,
  AuthenticationController,
  CategoryController,
  MenuController,
  FoodIngredientsController,
  DetailFoodIngredientsController,
  MenuIngredientsController
}