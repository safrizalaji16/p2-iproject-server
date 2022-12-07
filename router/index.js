const router = require("express").Router();
const userRouter = require("./user");
const productRouter = require("./product");
const orderRouter = require("./order");
const { authentication } = require("../middlewares/authentication");
const axios = require("axios");

router.use(userRouter);
router.use("/products", productRouter);
router.get("/quotes", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://api.api-ninjas.com/v1/quotes?category=famous`,
      {
        headers: {
          "X-Api-Key": process.env.QUOTE_KEY,
        },
      }
    );

    res.status(200).json(data[0].quote);
  } catch (err) {
    next(err);
  }
});
router.use(authentication);
router.use("/orders", orderRouter);

module.exports = router;
