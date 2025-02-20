import dotenv from "dotenv";
import connectDB from "./src/db/index.js";

import { app } from "./src/app.js";

dotenv.config({
  path: "./.env",
});

app.get("/", (req, res) => {
  res.send("Backend Assignemnt");
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`App is listening at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!!!!", err);
  });

app.on("error", (err) => {
  console.log("ERROR :", err);
  throw err;
});

export default app;
