import { Router } from "express";
import { validationResult } from "express-validator";
import authController from "../controllers/authController.js";
import { authenticate } from "../middleware/authentication.js";
import {
  signInValidation,
  signUpValidation,
} from "../middleware/validations.js";

const authRouter = Router();

authRouter.get("/sign-in", authController.signin_get);
authRouter.post("/sign-in", signInValidation, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render("sign-in-form", { errors: errors.array(), title: "Sign In" });
  }

  return authenticate(req, res, next);
});

authRouter.get("/sign-out", (req, res, next) => {
  req.logOut((error) => {
    if (error) {
      next(error);
    }
    res.redirect("/");
  });
});

authRouter.get("/sign-up", authController.signup_get);
authRouter.post("/sign-up", signUpValidation, authController.signup_post);

export default authRouter;
