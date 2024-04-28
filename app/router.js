//const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { ApplicationController, AuthenticationController } = require("./controllers");
const { admin_acc } = require("./models");

function apply(app) {
  const adminModel = admin_acc;

  const applicationController = new ApplicationController();
  const authenticationController = new AuthenticationController({ bcrypt, jwt, adminModel });
  
  app.get("/", applicationController.handleGetRoot);

  app.post("/v1/auth/login", authenticationController.handleLogin);

  app.use(applicationController.handleNotFound);
  app.use(applicationController.handleError);

  return app;
}

module.exports = { apply }