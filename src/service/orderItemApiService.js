import db from "../models/index";
const getAllOrderItem = async () => {
  try {
    let orderItems = await db.OrderItems.findAll({
      include: {
        model: db.Order,
      },
    });
    console.log(">>>> check data order:", orderItems);
    if (orderItems) {
      return {
        EM: "get data success",
        EC: 0,
        DT: orderItems,
      };
    } else {
      return {
        EM: "get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    return {
      EM: "something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};
const updateOrderItem = async (data) => {
  console.log(">>>check data: ", data);
  try {
    let orderItem = await db.OrderItems.findOne({
      where: { id: data.id },
    });
    if (orderItem) {
      // update
      await orderItem.update({
        status: data.status,
      });
      return {
        EM: "Update orderItem succeeds",
        EC: 0,
        DT: "",
      };
    } else {
      // not found orderItem
      return {
        EM: "orderItem not found",
        EC: 2,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wroung with service",
      EC: 1,
      DT: "",
    };
  }
};

module.exports = { getAllOrderItem, updateOrderItem };
