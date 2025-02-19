import { Router } from "express";
import login from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/user").post(login);

export default authRouter;
