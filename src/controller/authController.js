import authService from "../service/authService";
require("dotenv").config();
import ms from "ms";

const handleLogin = async (req, res) => {
  try {
    let data = await authService.handleUserLogin(req.body);
    if (data.DT && data.DT.refresh_token) {
      // clear cookie
      res.clearCookie("refresh_token");
      // set cookie
      console.log(
        ">>>check ms: ",
        ms(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN)
      );
      res.cookie("refresh_token", data.DT.refresh_token, {
        httpOnly: true,
        maxAge: ms(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
      });
    }
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

const refresh_token = async (req, res) => {
  try {
    console.log(">>>check req.cookies: ", req.cookies);
    let refreshToken = req.cookies?.refresh_token;
    let data = await authService.handleRefreshToken(refreshToken);
    if (data.DT && data.DT.refresh_token) {
      // clear cookie
      res.clearCookie("refresh_token");
      // set cookie
      res.cookie("refresh_token", data.DT.refresh_token, {
        httpOnly: true,
        maxAge: ms(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
      });
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC, // error code
        DT: data.DT,
      });
    } else {
      return res.status(400).json({
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

const handleLogout = (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      EM: "logout successfully",
      EC: 0,
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

module.exports = {
  handleLogin,
  handleRegister,
  getAccount,
  refresh_token,
  handleLogout,
};
