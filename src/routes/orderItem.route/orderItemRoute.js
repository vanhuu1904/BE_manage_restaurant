import { Router } from "express";
import orderItemController from "../../controller/orderItemController";
const orderRouter = Router();
orderRouter.get("/read", orderItemController.readFunc);
orderRouter.put("/update", orderItemController.updateFunc);

export default orderRouter;
