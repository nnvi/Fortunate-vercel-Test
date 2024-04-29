//const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
   ApplicationController,
   AuthenticationController,
   CategoryController,
   MenuController,
  } = require("./controllers");

const { 
  admin_acc,
  category,
  menu,
} = require("./models");

function apply(app) {
  const adminModel = admin_acc;
  const categoryModel = category;
  const menuModel = menu;

  const applicationController = new ApplicationController();
  const authenticationController = new AuthenticationController({ bcrypt, jwt, adminModel });
  const categoryController = new CategoryController({ categoryModel });
  const menuController = new MenuController({ menuModel });
  
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

  app.use(applicationController.handleNotFound);
  app.use(applicationController.handleError);

  return app;
}

module.exports = { apply }