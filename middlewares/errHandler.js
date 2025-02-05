module.exports = {
  errHandler(err, req, res, next) {
    console.log(err);
    let status = 500;
    let msg = "Internal Server Error";

    switch (err.name) {
      case "SequelizeUniqueConstraintError":
      case "SequelizeValidationError":
        status = 400;
        msg = err.errors.map((el) => el.message)[0];
        break;

      case "JsonWebTokenError":
      case "Unauthorized":
        status = 401;
        msg = "Please Login First";
        break;

      case "Accommodation Not Found":
        status = 404;
        msg = "Accommodation Not Found";
        break;

      case "Bookmark Bad Request":
        status = 400;
        msg = "You Already Add This Accommodation!";
        break;

      case "Customer Not Found":
        status = 404;
        msg = "Customer Not Found";
        break;

      case "Error email or password":
      case "Error google login":
        status = 401;
        msg = "Error invalid email or password";
        break;

      case "Forbidden":
        status = 403;
        msg = "You have no access";
        break;
    }

    res.status(status).json({ msg });
  },
};
