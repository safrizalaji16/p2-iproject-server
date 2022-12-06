const { Order } = require("../models");

class Controller {
  static async addOrder(req, res, next) {
    try {
      const { ProductId } = req.body;
      const newOrder = await Order.create({
        UserId: req.User.id,
        ProductId,
      });

      res.status(201).json(newOrder);
    } catch (err) {
      next(err);
    }
  }
  static async readAllOrders(req, res, next) {
    try {
      const Orders = await Order.findAll();

      res.status(200).json(Orders);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
