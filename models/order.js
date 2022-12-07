"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User Id is required",
          },
          notEmpty: {
            msg: "User Id is required",
          },
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product Id is required",
          },
          notEmpty: {
            msg: "Product Id is required",
          },
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Weight is required",
          },
          notEmpty: {
            msg: "Weight is required",
          },
        },
      },
      paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Payment Status is required",
          },
          notEmpty: {
            msg: "Payment Status is required",
          },
        },
        defaultValue: "unpaid",
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Origin is required",
          },
          notEmpty: {
            msg: "Origin is required",
          },
        },
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Destination is required",
          },
          notEmpty: {
            msg: "Destination is required",
          },
        },
      },
      courier: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Courier is required",
          },
          notEmpty: {
            msg: "Courier is required",
          },
        },
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required",
          },
          notEmpty: {
            msg: "Price is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
