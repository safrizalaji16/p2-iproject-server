"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "unpaid",
      },
      weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      origin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      courier: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
