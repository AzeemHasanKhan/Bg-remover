import express from "express";
import { clerkWebHooks, paymentRazorpay, userCredits, verifyRazorpay } from "../conrollers/userController.js";
import authUser from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/webhooks", clerkWebHooks);
userRouter.get("/credits", authUser, userCredits);
userRouter.post("/pay-razor", authUser, paymentRazorpay);
userRouter.post("/verify-razor", verifyRazorpay);

export default userRouter;
