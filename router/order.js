const Controller = require("../controllers/order");
const { authorizationOwner } = require("../middlewares/authorization");

const router = require("express").Router();

router
  .get("/", Controller.readAllOrders)
  .get("/city", Controller.rajaOngkirCity)
  .post("/cost", Controller.rajaOngkirCost)
  .post("/:id", Controller.addOrder)
  .use("/:id", authorizationOwner)
  .patch("/:id", Controller.editPaymentStatus)
  .delete("/:id", Controller.deleteOrder);

module.exports = router;
