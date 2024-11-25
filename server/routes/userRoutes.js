import express from "express";
import { clerkWebHooks } from "../conrollers/userController.js";

const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebHooks);

export default userRouter;