const Controller = require("../controllers/order");

const router = require("express").Router();

router.post("/", Controller.addOrder).get("/", Controller.readAllOrders);

module.exports = router;
