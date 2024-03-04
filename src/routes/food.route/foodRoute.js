import { Router } from "express";
import foodController from "../../controller/foodController";
const foodRouter = Router();

foodRouter.get("/read", foodController.readFunc);
foodRouter.post("/create", foodController.createFunc);
foodRouter.post("/createFoods", foodController.createFoods);
foodRouter.put("/update", foodController.updateFunc);
foodRouter.put("/updateFoods", foodController.updateSoldFoodByUser);
foodRouter.delete("/delete/:foodId", foodController.deleteFunc);
foodRouter.get("/getAFood/:id", foodController.getFood);
foodRouter.get("/getFoodByName/:food", foodController.getFoodByName);
export default foodRouter;
