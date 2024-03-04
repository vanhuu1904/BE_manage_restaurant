import { Router } from "express";
import groupController from "../../controller/groupController";
const groupRoute = Router();

groupRoute.get("/read", groupController.readFunc);
export default groupRoute;
