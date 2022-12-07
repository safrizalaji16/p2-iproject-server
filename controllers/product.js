const axios = require("axios");

const { Product } = require("../models");

class Controller {
  static async readAllProducts(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list",
        params: {
          country: "us",
          lang: "en",
          currentpage: "0",
          pagesize: "30",
          categories: "men_all",
          concepts: "H&M MAN",
        },
        headers: {
          "X-RapidAPI-Key":
            "2e41e92258mshf64252ade8a6ebfp1bff9ajsn9a879d0f9dc4",
          "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
        },
      });

      res.status(200).json(data.results);
    } catch (err) {
      next(err);
    }
  }
  static async readDetailProduct(req, res, next) {
    try {
      const { productCode } = req.params;

      const { data } = await axios({
        method: "GET",
        url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail",
        params: { lang: "en", country: "us", productcode: `${productCode}` },
        headers: {
          "X-RapidAPI-Key":
            "2e41e92258mshf64252ade8a6ebfp1bff9ajsn9a879d0f9dc4",
          "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
        },
      });

      if (!data) {
        throw {
          name: "Product Not Found",
        };
      }

      res.status(200).json(data.product.articlesList[0]);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
