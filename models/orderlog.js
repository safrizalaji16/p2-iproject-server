"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderLog.init(
    {
      totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Total Quantity is required",
          },
          notEmpty: {
            msg: "Total Quantity is required",
          },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Total Price is required",
          },
          notEmpty: {
            msg: "Total Price is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "OrderLog",
    }
  );
  return OrderLog;
};
