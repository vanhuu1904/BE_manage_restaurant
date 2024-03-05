import { Op } from "sequelize";
import db from "../models/index";
const getAllFood = async () => {
  try {
    let food = await db.Food.findAll({
      attributes: ["id", "name", "price", "status", "sold", "image"],
    });
    if (food) {
      return {
        EM: "get data succeeds",
        EC: 0,
        DT: food,
      };
    } else {
      return {
        EM: "get data succeeds",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(">>>check error: ", error);
    return {
      EM: "something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const createFood = async (data) => {
  try {
    console.log(">>>check data: ", data);
    await db.Food.create({
      name: data.name,
      price: data.price,
      status: data.status,
      image: data.image,
    });
    return {
      EM: "A food is created successfully",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(">>>check error: ", error);
    return {
      EM: "something wrongs in service...",
      EC: 1,
      DT: [],
    };
  }
};

const updateFood = async (data) => {
  try {
    console.log(">>>check data: ", data);
    let food = await db.Food.findOne({
      where: { id: data.id },
    });
    if (food) {
      await food.update({
        name: data.name,
        price: data.price,
        status: data.status,
        image: data.image,
      });
      return {
        EM: "Update food succeeds...",
        EC: 0,
        DT: "",
      };
    } else {
      return {
        EM: "Food not found",
        EC: 2,
        DT: "",
      };
    }
  } catch (error) {
    console.log(">>>check error: ", error);
    return {
      EM: "something wroung with service",
      EC: 1,
      DT: "",
    };
  }
};

const deleteFood = async (foodId) => {
  try {
    let food = await db.Food.findOne({ where: { id: foodId } });
    if (food) {
      await food.destroy();
      return {
        EM: "delete food succeeds",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "not found food",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(">>check error: ", error);
    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};

const createAllFoods = async (data) => {
  try {
    console.log(">>>check data: ", data);
    let res = await db.Food.bulkCreate(data);
    // console.log(">>>>check res: ", res);
    return {
      EM: "create all foods succeeds",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(">>check error: ", error);
    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};

const getAFood = async (id) => {
  try {
    console.log(">>chcek id: ", id);
    let food = await db.Food.findOne({
      where: { id: id },
      attributes: ["id", "name", "price", "status", "sold", "image"],
    });
    console.log(">>>check data: ", food);
    if (food) {
      if (food) {
        return {
          EM: "get data succeeds",
          EC: 0,
          DT: food,
        };
      } else {
        return {
          EM: "get data succeeds",
          EC: 0,
          DT: [],
        };
      }
    }
  } catch (error) {
    console.log(">>>check error: ", error);
    return {
      EM: "something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const getFoodByName = async (data) => {
  try {
    console.log(">>>check data: ", data);
    if (data === "all") {
      let food = await db.Food.findAll({
        attributes: ["id", "name", "price", "status", "sold", "image"],
      });
      if (food) {
        return {
          EM: "get data succeeds",
          EC: 0,
          DT: food,
        };
      } else {
        return {
          EM: "get data succeeds",
          EC: 0,
          DT: [],
        };
      }
    } else if (data === "nuoc") {
      let food = await db.Food.findAll({
        attributes: ["id", "name", "price", "status", "sold", "image"],
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: "%Trà%", // Tìm tất cả các tên có chứa chuỗi 'John'
              },
            },
            {
              name: {
                [Op.like]: "%Coca%", // Tìm tất cả các tên có chứa chuỗi 'Jane'
              },
            },
            {
              name: {
                [Op.like]: "%Pepsi%", // Tìm tất cả các tên có chứa chuỗi 'Jane'
              },
            },
            {
              name: {
                [Op.like]: "%Cam%", // Tìm tất cả các tên có chứa chuỗi 'Jane'
              },
            },
          ],
        },
      });
      if (food) {
        return {
          EM: "get data succeeds",
          EC: 0,
          DT: food,
        };
      } else {
        return {
          EM: "get data succeeds",
          EC: 0,
          DT: [],
        };
      }
    } else if (data === "another") {
      let food = await db.Food.findAll({
        attributes: ["id", "name", "price", "status", "sold", "image"],
        where: {
          [Op.and]: [
            {
              name: {
                [Op.notLike]: "%Bún%",
              },
            },
            {
              name: {
                [Op.notLike]: "%Phở%",
              },
            },
            {
              name: {
                [Op.notLike]: "%Cơm%", // Tìm tất cả các tên có chứa chuỗi 'Jane'
              },
            },
          ],
        },
      });
      if (food) {
        return {
          EM: "get data succeeds",
          EC: 0,
          DT: food,
        };
      } else {
        return {
          EM: "get data succeeds",
          EC: 0,
          DT: [],
        };
      }
    } else {
      let food = await db.Food.findAll({
        attributes: ["id", "name", "price", "status", "sold", "image"],
        where: {
          name: {
            [Op.like]: `%${data}%`, // Tìm tất cả các tên có chứa chuỗi 'john' không phân biệt chữ hoa chữ thường
          },
        },
      });
      if (food) {
        return {
          EM: "get data succeeds",
          EC: 0,
          DT: food,
        };
      } else {
        return {
          EM: "get data succeeds",
          EC: 0,
          DT: [],
        };
      }
    }
  } catch (error) {
    console.log(">>>check error: ", error);
    return {
      EM: "something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

const updateSoldFood = () => {
  try {
    return {
      EM: "update sold succeeds...",
      EC: 0,
      DT: "",
    };
  } catch (error) {
    console.log(">>>check error: ", error);
    return {
      EM: "something wrongs with service",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getAllFood,
  createFood,
  updateFood,
  deleteFood,
  createAllFoods,
  getAFood,
  getFoodByName,
  updateSoldFood,
};
