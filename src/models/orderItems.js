"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderItems.hasMany(models.Order);
    }
  }
  OrderItems.init(
    {
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderItems",
    }
  );
  return OrderItems;
};
