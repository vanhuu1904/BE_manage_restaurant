require("dotenv").config();
import db from "../models/index";
import bcrypt from "bcryptjs";
import { Op } from "sequelize";
import { getGroupWithRoles } from "./JWTService";
import { createJWT } from "../middleware/JWTAction";
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
        let userData = await db.User.findOne({
          where: {
            username: rawData.username,
          },
          attributes: ["id", "username", "address", "phone", "groupId"],
        });
        let payload = {
          id: user.id,
          username: user.username,
          name: user.name,
          groupWithRoles,
        };

        let token = createJWT(payload);

        return {
          EM: "ok!",
          EC: 0,
          DT: {
            access_token: token,
            groupWithRoles,
            user: userData,
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
module.exports = {
  handleUserRegister,
  handleUserLogin,
  hashUserPassword,
  checkUsername,
  checkPhone,
  handleLogout,
};
