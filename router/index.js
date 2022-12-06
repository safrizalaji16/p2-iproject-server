const router = require("express").Router();
const userRouter = require("./user");
const productRouter = require("./product");
const orderRouter = require("./order");
const { authentication } = require("../middlewares/authentication");

router.use(userRouter);
router.use("/products", productRouter);
router.use(authentication);
router.use("/orders", orderRouter);

module.exports = router;
