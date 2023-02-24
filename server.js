import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import salesRoute from "./routes/sales.js";

const app = express();

dotenv.config();
mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connected");
  } catch (error) {
    throw error;
  }
};
// to check if mongoDB connected or not or is reconnecting

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// routes
app.get("/",(req,res)=>{
  res.send("Api is running");
})
app.use("/api", salesRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log("conntected to backend.");
});
