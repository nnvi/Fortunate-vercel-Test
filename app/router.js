//const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
   ApplicationController,
   AuthenticationController,
   CategoryController,
  } = require("./controllers");

const { 
  admin_acc,
  category,
} = require("./models");

function apply(app) {
  const adminModel = admin_acc;
  const categoryModel = category;

  const applicationController = new ApplicationController();
  const authenticationController = new AuthenticationController({ bcrypt, jwt, adminModel });
  const categoryController = new CategoryController({ categoryModel });
  
  app.get("/", applicationController.handleGetRoot);

  app.post("/v1/auth/login", authenticationController.handleLogin);

  app.post("/api/v1/new-category", categoryController.handleCreateCategory);
  app.get("/api/v1/category", categoryController.handleListCategory);
  app.get("/api/v1/category/:id", categoryController.handleGetCategory);
  app.put("/api/v1/category/:id", categoryController.handleUpdateCategory);
  app.delete("/api/v1/category/:id", categoryController.handleDeleteCategory);

  app.use(applicationController.handleNotFound);
  app.use(applicationController.handleError);

  return app;
}

module.exports = { apply }