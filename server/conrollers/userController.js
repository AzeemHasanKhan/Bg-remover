import { Webhook } from "svix";
import userModel from "../models/userModel.js";


//api controller function to manage clerk user with data base

// http://localhost:4000/api/user/webhooks

const clerkWebHooks = async (req, res) => {
  try {
    //creta svix instance with clerk webhook
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify),
      {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      };
    const { data, type } = req.body;
    // console.log(data);
    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        console.log(userData.photo)
        await userModel.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({});

        break;
      }
      default: {
        console.log("Unknown webhook type:", type);
      }
    }
  } catch (error) {
    console.error("Error verifying webhook:", error.message);
    return res.json({ success: false, message: "Invalid webhook signature" });
  }
};


export {clerkWebHooks}