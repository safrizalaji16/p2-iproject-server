const Controller = require("../controllers/product");

const router = require("express").Router();

router.post("/", Controller.addProduct).get("/", Controller.readAllProducts);

module.exports = router;
