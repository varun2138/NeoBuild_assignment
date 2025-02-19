import { Router } from "express";

import checkAuthentication from "../utils/checkAuth.js";
import resumeConverter from "../controllers/resume.controller.js";

const resumeRouter = Router();

resumeRouter.post("/process", checkAuthentication, resumeConverter);

export default resumeRouter;
