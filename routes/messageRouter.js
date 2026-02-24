import { Router } from "express";
import messageController from "../controllers/messageController.js";
import { messageValidation } from "../middleware/validations.js";

const messageRouter = Router();

messageRouter.get("/new", messageController.new_message_get);
messageRouter.post(
  "/new",
  messageValidation,
  messageController.new_message_post,
);
messageRouter.post("/delete/:id", messageController.delete_message_post);
messageRouter.get("/edit/:id", messageController.edit_message_get);
messageRouter.post(
  "/edit/:id",
  messageValidation,
  messageController.edit_message_post,
);

export default messageRouter;
