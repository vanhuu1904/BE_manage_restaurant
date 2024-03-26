import db from "../models/index";
import { v4 as uuidv4 } from "uuid";
import order from "../models/order";
const createNewOrder = async (data) => {
  try {
    let orderItem = await db.OrderItems.create({
      status: 0,
    });
    console.log(">>>check orderItem id: ", orderItem.get("id"));
    const userId = data.userId;
    let foodItems = data.OrderItemsIN.map((item, index) => {
      return {
        foodId: item.foodID,
        quantity: item.quantity,
        orderItemId: orderItem.get("id"),
        userId: userId,
        name: item.name,
        phone: item.phone,
        address: item.address,
        payments: item.payments,
        totalPrice: item.totalPrice,
      };
    });
    let res = await db.Order.bulkCreate(foodItems);
    if (res) {
      foodItems &&
        foodItems.map(async (item, index) => {
          let food = await db.Food.findOne({
            where: { id: item.foodId },
            attributes: ["id", "name", "price", "status", "image", "sold"],
          });
          if (food) {
            await food.update({
              sold: food.sold + item.quantity,
            });
          }
        });
      console.log(">>>>check food item: ", foodItems);
      return { EM: "Order is succeeds!", EC: 0, DT: [] };
    } else {
      return {
        EM: "loi",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs in service...",
      EC: 1,
      DT: [],
    };
  }
};

const getOrderByUserId = async (userId) => {
  try {
    let data = await db.Order.findAll({
      where: { userId: userId },
      include: [
        {
          model: db.Food,
          attributes: ["name", "price", "image", "sold", "id"],
          // through: { attributes: [] },
        },
        {
          model: db.OrderItems,
          attributes: ["status"],
        },
      ],
      order: [["createdAt", "desc"]],
    });
    if (data) {
      console.log(">>>check data: ", data);
      return {
        EM: "get all order by user...",
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: "not found order by user",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs in service...",
      EC: 1,
      DT: [],
    };
  }
};

const getFoodsByOrder = async (orderItemId) => {
  try {
    console.log(">>>check orderItemId: " + orderItemId);
    let data = await db.Order.findAll({
      where: { orderItemId: orderItemId },
      include: [
        {
          model: db.Food,
          attributes: ["name", "price", "image", "sold"],
          // through: { attributes: [] },
        },
      ],
    });
    console.log(">>>check data: ", data);
    if (data) {
      return {
        EM: "get all order by user...",
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: "not found order by user",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrongs in service...",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  createNewOrder,
  getOrderByUserId,
  getFoodsByOrder,
};
