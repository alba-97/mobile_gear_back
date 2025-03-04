import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn("orders", "paymentIntentId", {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "legacy",
    });

    await queryInterface.addColumn("orders", "shippingAddress", {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn("orders", "paymentIntentId");
    await queryInterface.removeColumn("orders", "shippingAddress");
  },
};
