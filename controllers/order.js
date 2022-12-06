const { Order, Product } = require("../models");

class Controller {
  static async addOrder(req, res, next) {
    try {
      const { ProductId } = req.body;
      const findProduct = await Product.findByPk(ProductId);

      if (!findProduct) {
        throw {
          name: "Product Not Found",
        };
      }

      const newOrder = await Order.create({
        UserId: req.User.id,
        ProductId,
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
  static async xendit() {
    const x = new require("xendit-node")({
      secretKey:
        "xnd_development_P4qDfOss0OCpl8RtKrROHjaQYNCk9dN5lSfk+R1l9Wbe+rSiCwZ3jw==",
    });

    const { EWallet } = x;
    const ewalletSpecificOptions = {};
    const ew = new EWallet(ewalletSpecificOptions);

    const resp = await ew.createEWalletCharge({
      referenceID: "test-reference-id",
      currency: "IDR",
      amount: 1000,
      checkoutMethod: "ONE_TIME_PAYMENT",
      channelCode: "ID_SHOPEEPAY",
      channelProperties: {
        successRedirectURL: "https://dashboard.xendit.co/register/1",
      },
      metadata: {
        branch_code: "tree_branch",
      },
    });
    console.log(resp);
  }
}

module.exports = Controller;
