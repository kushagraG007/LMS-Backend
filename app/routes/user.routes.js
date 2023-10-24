const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const transactionController = require("../controllers/transaction.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
  app.put(
    "/api/user/personal-info",
    [authJwt.verifyToken], // You may add additional middleware if needed
    controller.updatePersonalInfo
  );

  // Retrieve personal information route
  app.get(
    "/api/user/personal-info",
    [authJwt.verifyToken], // You may add additional middleware if needed
    controller.getPersonalInfo
  );

  app.post("/transactions/create", transactionController.createTransaction);
};
