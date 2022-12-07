const { Order, Product } = require("../models");

const axios = require("axios");

class Controller {
  static async addOrder(req, res, next) {
    try {
      const { ProductId } = req.params;
      const { quantity } = req.body;
      const findProduct = await Product.findByPk(ProductId);

      if (!findProduct) {
        throw {
          name: "Product Not Found",
        };
      }

      const newOrder = await Order.create({
        UserId: req.User.id,
        ProductId,
        quantity,
        paymentStatus: "unpaid",
      });

      res.status(201).json(newOrder);
    } catch (err) {
      next(err);
    }
  }
  static async readAllOrders(req, res, next) {
    try {
      const Orders = await Order.findAll({ where: { UserId: req.User.id } });

      res.status(200).json(Orders);
    } catch (err) {
      next(err);
    }
  }
  static async editPaymentStatus(req, res, next) {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) {
        throw {
          name: "Order Not Found",
        };
      }

      await Order.update({ paymentStatus: "paid" }, { where: { id } });

      res.status(200).json({ msg: "Success to update status!" });
    } catch (err) {
      next(err);
    }
  }
  static async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);

      if (!order) {
        throw {
          name: "Order Not Found",
        };
      }

      const deletedOrder = await Order.destroy({
        where: {
          id,
          paymentStatus: "unpaid",
        },
      });

      if (!deletedOrder) {
        throw {
          name: "Error Delete",
        };
      }

      res.status(200).json({
        msg: `Order success to delete`,
        data: order,
      });
    } catch (err) {
      next(err);
    }
  }
  static async rajaOngkirCity(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://api.rajaongkir.com/starter/city",
        headers: {
          key: "e35716ef96df4a9d5d32667c332e40bd",
        },
      });

      res.status(200).json(data.rajaongkir.results);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
