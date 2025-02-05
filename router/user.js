const Controller = require("../controllers/user");

const router = require("express").Router();

router
.post("/register", Controller.register)
.post("/login", Controller.login);

module.exports = router;
