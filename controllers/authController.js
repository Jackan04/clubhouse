import User from "../models/user.js";
import db from "../db/db.js";
import { validationResult } from "express-validator";

function signin_get(req, res) {
  res.render("sign-in-form", { title: "Sign In", errors: [] });
}

function signup_get(req, res) {
  res.render("sign-up-form", { title: "Sign Up", errors: [] });
}

async function signup_post(req, res, next) {
  const { firstname, lastname, username, password, admin } = req.body;
  const user = new User(firstname, lastname, username, password, admin);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render("sign-up-form", { errors: errors.array(), title: "Sign Up" });
  }

  try {
    await db.insertUser(user);
    res.redirect("/auth/sign-in");
  } catch (error) {
    next(error);
  }
}

export default { signup_get, signup_post, signin_get };
