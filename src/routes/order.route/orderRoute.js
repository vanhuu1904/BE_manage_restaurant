import { Router } from "express";
import orderController from "../../controller/orderController";
const orderRouter = Router();

orderRouter.get("/readByUserId/:userId", orderController.readFunc);
orderRouter.post("/create", orderController.createFunc);
orderRouter.put("/update", orderController.updateFunc);
orderRouter.delete("/delete", orderController.deleteFunc);

export default orderRouter;
