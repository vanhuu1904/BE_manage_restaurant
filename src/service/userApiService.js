import e from "express";
import db from "../models/index";
import { checkUsername, checkPhone, hashUserPassword } from "./authService";
const getAllUsers = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "name", "phone", "address", "groupId"],
      include: { model: db.Group, attributes: ["name", "description", "id"] },
    });
    console.log(">>>> check data user:", users);
    if (users) {
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
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
const getUserWithPaginate = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "name", "phone", "address"],
      include: { model: db.Group, attributes: ["name", "description", "id"] },
      order: [["id", "desc"]],
    });
    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPage: totalPages,
      users: rows,
    };
    console.log(">>>check data: ", data);
    return {
      EM: "fetch users with paginate",
      EC: 0,
      DT: data,
    };
  } catch (error) {}
};

const createNewUser = async (data) => {
  try {
    // check email/phonenumber are exist
    let isUsernameExist = await checkUsername(data.username);
    if (isUsernameExist)
      return {
        EM: "The email is already exist",
        EC: 1,
        DT: "email",
      };
    let isPhoneExist = await checkPhone(data.phone);
    if (isPhoneExist)
      return {
        EM: "The phone is already exist",
        EC: 1,
        DT: "phone",
      };
    // hash user password
    let hashPassword = hashUserPassword(data.password);
    // create new user
    await db.User.create({ ...data, password: hashPassword });
    return { EM: "A user is created successfully!", EC: 0, DT: [] };
  } catch (error) {
    console.log(e);
    return {
      EM: "something wrongs in service...",
      EC: 1,
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  console.log(">>>check data: ", data);
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      // update
      await user.update({
        name: data.name,
        address: data.address,
        phone: data.phone,
        groupId: data.groupId,
      });
      return {
        EM: "Update user succeeds",
        EC: 0,
        DT: "",
      };
    } else {
      // not found user
      return {
        EM: "User not found",
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

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "delete user succeeds",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "not found user",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);

    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};

const getUserById = async (userId) => {
  try {
    let user = await db.User.findOne({ where: { id: userId } });
    if (user) {
      return {
        EM: "get user succeeds...",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "not found user",
        EC: 0,
        DT: user,
      };
    }
  } catch (error) {
    console.log(">>> check error: ", error);
    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};
module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPaginate,
  getUserById,
};
