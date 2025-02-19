import { Router } from "express";
import searchProfile from "../controllers/search.controller.js";
import checkAuthentication from "../utils/checkAuth.js";

const searchRouter = Router();

searchRouter.post("/profile", checkAuthentication, searchProfile);
export default searchRouter;
