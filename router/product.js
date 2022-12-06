const Controller = require("../controllers/product");

const router = require("express").Router();

router
  .post("/products", Controller.register)
  .get("/products", Controller.login);

module.exports = router;
