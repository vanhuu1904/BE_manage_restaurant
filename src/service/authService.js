require("dotenv").config();
import db from "../models/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getGroupWithRoles } from "./JWTService";
import {
  createAccessTokenJWT,
  createRefreshTokenJWT,
} from "../middleware/JWTAction";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const checkUsername = async (username) => {
  let user = await db.User.findOne({ where: { username: username } });
  if (user) {
    return true;
  }
  return false;
};

const checkPhone = async (userPhone) => {
  let user = await db.User.findOne({ where: { phone: userPhone } });
  if (user) {
    return true;
  }
  return false;
};

const handleUserRegister = async (rawUserData) => {
  try {
    // check email/phonenumber are exist
    let isUsernameExist = await checkUsername(rawUserData.username);
    if (isUsernameExist)
      return {
        EM: "The username is already exist",
        EC: 1,
        DT: "",
      };
    let isPhoneExist = await checkPhone(rawUserData.phone);
    if (isPhoneExist)
      return {
        EM: "The phone is already exist",
        EC: 1,
        DT: "",
      };
    // hash user password
    let hashPassword = hashUserPassword(rawUserData.password);
    // create new user

    await db.User.create({
      username: rawUserData.username,
      password: hashPassword,
      name: rawUserData.name,
      phone: rawUserData.phone,
      address: rawUserData.address,
      groupId: 1,
    });
    return { EM: "A user is created successfully!", EC: 0, DT: "" };
  } catch (error) {
    console.log(e);
    return {
      EM: "something wrongs in service...",
      EC: 1,
      DT: "",
    };
  }
};

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        username: rawData.username,
      },
    });

    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {
        // test roles:
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          id: user.id,
          username: user.username,
          name: user.name,
          groupWithRoles,
        };
        console.log(">>>check payload: ", payload);

        let token = createAccessTokenJWT(payload);
        let refresh_token = createRefreshToken(payload);
        let dataUserUpdate = await user.update({
          refresh_token: refresh_token,
        });
        console.log(">>>check datauser: ", dataUserUpdate);

        return {
          EM: "ok!",
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
            user: user,
            refresh_token: refresh_token,
          },
        };
      }
    }
    return {
      EM: "Your username or password is incorrect!",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log(">>>check error: ", error);
    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};
const handleLogout = (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Logout successfully!",
      EC: 0,
      DT: "",
    });
  } catch (error) {
    console.log(">>>check error: ", error);
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};

const verifyRefreshToken = (token) => {
  let key = process.env.JWT_REFRESH_TOKEN_SECRET;
  let decoded = null;

  try {
    decoded = jwt.verify(token, key);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createRefreshToken = (payload) => {
  let key = process.env.JWT_ACCESS_TOKEN_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });
  } catch (error) {
    console.log(error);
  }
  return token;
};

const handleRefreshToken = async (refreshToken) => {
  try {
    let data = verifyRefreshToken(refreshToken);
    if (data) {
      let user = await db.User.findOne({
        where: { refresh_token: refreshToken },
        attributes: [
          "id",
          "username",
          "name",
          "address",
          "phone",
          "groupId",
          "refresh_token",
        ],
      });
      console.log(">>>check user:", user);
      if (user) {
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          id: user.id,
          username: user.username,
          name: user.name,
          groupWithRoles,
        };
        const refresh_token = createRefreshToken(payload);
        await user.update({
          refresh_token: refresh_token,
        });
        return {
          EM: "ok!",
          EC: 0,
          DT: {
            access_token: createAccessTokenJWT(payload),
            groupWithRoles,
            user: user,
            refresh_token: refresh_token,
          },
        };
      } else {
        return {
          EM: "Refresh token không hợp lệ. Vui lòng login",
          EC: 1,
          DT: "",
        };
      }
    } else {
      return {
        EM: "Refresh token không hợp lệ. Vui lòng login",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log(">>>check error: ", error);
    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};
module.exports = {
  handleUserRegister,
  handleUserLogin,
  hashUserPassword,
  checkUsername,
  checkPhone,
  handleLogout,
  handleRefreshToken,
};
