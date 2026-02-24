import { body } from "express-validator";

const signUpValidation = [
  body("firstname").trim().notEmpty().withMessage("First name is required"),
  body("lastname").trim().notEmpty().withMessage("Last name is required"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .custom(async (username) => {
      const existingUser = await db.getUserByUsername(username);
      if (existingUser) {
        return false;
      }
      return true;
    })
    .withMessage("Username is already taken"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("repeat-password").custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Passwords do not match");
    return true;
  }),
];

const signInValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

const messageValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Title cannot exceed 50 characters"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Message cannot be empty")
    .isLength({ max: 500 })
    .withMessage("Message cannot exceed 500 characters"),
];

export { signUpValidation, signInValidation, messageValidation };
