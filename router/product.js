const Controller = require("../controllers/product");

const router = require("express").Router();

router
  .post("/", Controller.addProduct)
  .get("/", Controller.readAllProducts)
  .get("/:id", Controller.readDetailProduct);

module.exports = router;
