import db from "../models/index";
import { v4 as uuidv4 } from "uuid";
const createNewOrder = async (data) => {
  try {
    let id = uuidv4();
    console.log(">>>check id: " + id);
    let foodItems = data.OrderItemsIN.map((item, index) => {
      return {
        foodId: item.foodID,
        quantity: item.quantity,
        orderItemId: id,
        userId: data.userId,
        status: "Pending",
      };
    });
    await db.Order.bulkCreate(foodItems);
    console.log(">>>>check food item: ", foodItems);
    return { EM: "Order is succeeds!", EC: 0, DT: [] };
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
          attributes: ["name", "price", "image", "sold"],
          // through: { attributes: [] },
        },
      ],
    });
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
module.exports = { createNewOrder, getOrderByUserId, getFoodsByOrder };
