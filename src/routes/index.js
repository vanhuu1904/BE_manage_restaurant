import express from "express";
import userRoute from "./user.route/userRoute";
import foodRoute from "./food.route/foodRoute";
import orderRoute from "./order.route/orderRoute";
import authRoute from "./auth.route/authRoute";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
import roleRoute from "./role.route/roleRoute";
import groupRoute from "./group.route/groupRoute";

const router = express.Router();
const initApiRoutes = (app) => {
  router.all("*", checkUserJWT);
  router.use("/user", userRoute);
  router.use("/food", foodRoute);
  router.use("/order", orderRoute);
  router.use("/auth", authRoute);
  router.use("/role", roleRoute);
  router.use("/group", groupRoute);
  return app.use("/", router);
};

export default initApiRoutes;
