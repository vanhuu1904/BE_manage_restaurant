import authService from "../service/authService";
const handleLogin = async (req, res) => {
  try {
    let data = await authService.handleUserLogin(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC, // error code
      DT: data.DT,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      EM: "error from server", // error message
      EC: "-1", //error code
      DT: "",
    });
  }
};
const handleRegister = async (req, res) => {
  try {
    let data = await authService.handleUserRegister(req.body);
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

const getAccount = (req, res) => {
  console.log(">>>check req.user: ", req.user);
  return res.status(200).json({
    EM: "",
    EC: 0,
    DT: {
      id: req.user.id,
      username: req.user.username,
      name: req.user.name,
      groupWithRoles: req.user.groupWithRoles,
    },
  });
};
module.exports = {
  handleLogin,
  handleRegister,
  getAccount,
};