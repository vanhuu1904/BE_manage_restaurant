import foodApiService from "../service/foodApiService";
const readFunc = async (req, res) => {
  try {
    let data = await foodApiService.getAllFood();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
  }
};
const createFunc = async (req, res) => {
  try {
    let data = await foodApiService.createFood(req.body);
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
    let data = await foodApiService.updateFood(req.body.data);
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
    console.log(">>>check req.params = ", req.params);
    let data = await foodApiService.deleteFood(req.params.foodId);
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

const createFoods = async (req, res) => {
  try {
    console.log(">>>check req.params = ", req.params);
    console.log(">>check res: ", req.body);
    let data = await foodApiService.createAllFoods(req.body.data);
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

const getFood = async (req, res) => {
  try {
    console.log(">>check res: ", req.params.id);
    let data = await foodApiService.getAFood(req.params.id);
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

const getFoodByName = async (req, res) => {
  try {
    console.log(">>check res: ", req.params.food);
    let data = await foodApiService.getFoodByName(req.params.food);
    console.log("check data: ", data);
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

const updateSoldFoodByUser = async (req, res) => {
  let data = await foodApiService.updateSoldFood(req.body);
  if (data) {
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: data.DT,
    });
  } else {
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
  createFoods,
  getFood,
  getFoodByName,
  updateSoldFoodByUser,
};
