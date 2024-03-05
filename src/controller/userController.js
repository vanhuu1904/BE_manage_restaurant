import userApiService from "../service/userApiService";
const readFunc = async (req, res) => {
  try {
    console.log(">>>check req.user: ", req.user);
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await userApiService.getUserWithPaginate(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // error code
        DT: data.DT,
      });
    } else {
      let data = await userApiService.getAllUsers();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // error code
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", //error code
      DT: "",
    });
  }
};
const createFunc = async (req, res) => {
  try {
    console.log(">>>check req.user: ", req.user);

    let data = await userApiService.createNewUser(req.body);
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
  console.log(":>>check req.body: ", req.body);
  try {
    let data = await userApiService.updateUser(req.body.data);
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
    let data = await userApiService.deleteUser(req.params.id);
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

const getUserAccount = async (req, res) => {
  return res.status(200).json({
    EM: "ok",
    EC: 0,
    DT: {
      access_token: req.token,
      groupWithRoles: req.user.groupWithRoles,
      name: req.user.name,
      username: req.user.username,
    },
  });
};

const readUserById = async (req, res) => {
  try {
    console.log(">>>check req.params: ", req.params);
    let data = await userApiService.getUserById(req.params.id);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: "",
    });
  } catch (error) {
    console.log(">>>check error: ", error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", //error code
      DT: "",
    });
  }
};
const updateRefreshToken = async (req, res) => {
  try {
    let data = await authController.updateRefreshToken(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: "",
    });
  } catch (error) {
    console.log(">>>check error: ", error);
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
  getUserAccount,
  readUserById,
  updateRefreshToken,
};
