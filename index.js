import dotenv from "dotenv";
import connectDB from "./src/db/index.js";

import { app } from "./src/app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(
    () => {
      app.get("/", (req, res) => {
        res.send("Backend Assignemnt");
      });
      app.listen(process.env.PORT || 4000, () => {
        console.log(`App is listening at port ${process.env.PORT}`);
      });
    },
    app.on("error", (err) => {
      console.log("ERROR :", err);
      throw err;
    })
  )
  .catch((err) => {
    console.log("MongoDB connection failed !!!!!", err);
  });
