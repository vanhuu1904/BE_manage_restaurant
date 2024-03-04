import { Router } from "express";
import roleController from "../../controller/roleController";
const roleRoute = Router();

roleRoute.get("/read", roleController.readFunc);
roleRoute.post("/create", roleController.createFunc);
roleRoute.put("/update", roleController.updateFunc);
roleRoute.delete("/delete", roleController.deleteFunc);
roleRoute.get("/by-group/:groupId", roleController.getRoleByGroup);
roleRoute.post("/asssign-to-group", roleController.assignRoleToGroup);

export default roleRoute;
