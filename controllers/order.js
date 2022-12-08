const { Order, Product } = require("../models");

const axios = require("axios");

class Controller {
  static async addOrder(req, res, next) {
    try {
      const ProductId = req.params.id;
      const { destination, price } = req.body;

      console.log(destination, price, ProductId);
      const newOrder = await Order.create({
        UserId: req.User.id,
        ProductId: +ProductId,
        destination,
        price,
        origin: "Surakarta",
        courier: "jnt",
        weight: 1000,
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
          key: process.env.RAJAONGKIR_KEY,
        },
      });

      res.status(200).json(data.rajaongkir.results);
    } catch (err) {
      next(err);
    }
  }
  static async rajaOngkirCost(req, res, next) {
    try {
      const { destination } = req.body;

      const { data } = await axios({
        method: "POST",
        url: "https://api.rajaongkir.com/starter/cost",
        headers: {
          key: process.env.RAJAONGKIR_KEY,
        },
        data: {
          origin: 445,
          destination,
          weight: 1000,
          courier: "jne",
        },
      });

      res.status(200).json(data.rajaongkir.results[0].costs);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
