const Controller = require("../controllers/product");

const router = require("express").Router();

router
  .get("/", Controller.readAllProducts)
  .get("/:productCode", Controller.readDetailProduct);

module.exports = router;
