const { Product } = require("../models");

class Controller {
  static async addProduct(req, res, next) {
    try {
      const { name, description, price, imageUrl } = req.body;
      const newProduct = await Product.create({
        name,
        description,
        price,
        imageUrl,
        status: "available",
      });

      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  }
  static async readAllProducts(req, res, next) {
    try {
      const products = await Product.findAll();

      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
  static async readDetailProduct(req, res, next) {
    try {
      const { id } = req.params;

      const product = await Product.findByPk(id);

      if (!product) {
        throw {
          name: "Product Not Found",
        };
      }

      res.status(200).json({
        data: product,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
