const { ApplicationController } = require("./controllers");

function apply(app) {
  const applicationController = new ApplicationController();
  
  app.get("/", applicationController.handleGetRoot);

  app.use(applicationController.handleNotFound);
  app.use(applicationController.handleError);

  return app;
}

module.exports = { apply }