import { Router } from "express";
import accountController from "../../controller/authController";
const authRoute = Router();

authRoute.post("/login", accountController.handleLogin);
authRoute.post("/register", accountController.handleRegister);
authRoute.get("/account", accountController.getAccount);
authRoute.get("/refresh", accountController.refresh_token);
export default authRoute;
