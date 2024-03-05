import orderApiService from "../service/orderApiService";
import userApiService from "../service/userApiService";
const readFunc = async (req, res) => {
  try {
    let data = await orderApiService.getOrderByUserId(req.params.userId);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: data.DT,
    });

    console.log(">>check req: ", req.query);
  } catch (error) {
    console.log(error);
  }
};
const createFunc = async (req, res) => {
  try {
    console.log(">>>>check data: ", req.body);
    let data = await orderApiService.createNewOrder(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", //error code
      DT: "",
    });
  }
};
const updateFunc = async (req, res) => {
  try {
    let data = await userApiService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", //error code
      DT: "",
    });
  }
};
const deleteFunc = async (req, res) => {
  try {
    console.log(">>>check req.body = ", req.body);
    let data = await userApiService.deleteUser(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", //error code
      DT: "",
    });
  }
};

const getFoodsByOrder = async (req, res) => {
  try {
    console.log(">>>check req.body = ", req.body);
    let data = await orderApiService.getFoodsByOrder(req.params.orderItemId);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", //error code
      DT: "",
    });
  }
};
module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getFoodsByOrder,
};
