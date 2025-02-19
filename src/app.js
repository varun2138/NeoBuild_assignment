import express from "express";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export const app = express();

app.use(express.json());

// routes

import authRouter from "./routes/auth.route.js";
import resumeRouter from "./routes/resume.route.js";
import searchRouter from "./routes/search.route.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/resume", resumeRouter);
app.use("/api/v1/user", searchRouter);
