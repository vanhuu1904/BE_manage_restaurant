import { Router } from "express";
import orderController from "../../controller/orderController";
const orderRouter = Router();

orderRouter.get("/history/:userId", orderController.readFunc);
orderRouter.post("/create", orderController.createFunc);
orderRouter.put("/update", orderController.updateFunc);
orderRouter.delete("/delete", orderController.deleteFunc);
orderRouter.get(
  "/readFoodByOrder/:orderItemId",
  orderController.getFoodsByOrder
);

export default orderRouter;
