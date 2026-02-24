import { Router } from "express";
import userController from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authentication.js";

const userRouter = Router();

userRouter.get("/", isAuthenticated, userController.user_get);

userRouter.get("/edit/:id", isAuthenticated, userController.user_edit_get);
userRouter.post("/edit/:id", isAuthenticated, userController.user_edit_post);

userRouter.post(
  "/delete/:id",
  isAuthenticated,
  userController.user_delete_post,
);

export default userRouter;
