import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";

//app config
const PORT = process.env.PORT || 4000;
const app = express();
await connectDB()

//initialize middleware
app.use(express.json());
app.use(cors());

//api routes
app.get("/", (re, res) => {
  res.send("API Working");
});

app.listen(PORT, () => {
  console.log("server is running on port no", PORT);
});
