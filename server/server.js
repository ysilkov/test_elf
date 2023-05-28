import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

async function startApp() {
  try {
    await mongoose.connect(process.env.DBL_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(process.env.PORT, () =>
      console.log("SERVER STARTED ON PORT 4000")
    );
  } catch (e) {
    console.log(e);
  }
}
startApp();
