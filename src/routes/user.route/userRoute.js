import { Router } from "express";
import userController from "../../controller/userController";
const userRouter = Router();

userRouter.get("/read", userController.readFunc);
userRouter.post("/create", userController.createFunc);
userRouter.put("/update", userController.updateFunc);
userRouter.delete("/delete/:id", userController.deleteFunc);
userRouter.get("/read/:id", userController.readUserById);
export default userRouter;
