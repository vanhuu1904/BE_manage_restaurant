"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.Order);
    }
  }
  Food.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      image: DataTypes.STRING,
      sold: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};
