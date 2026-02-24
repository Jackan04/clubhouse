import bcrypt from "bcrypt";
import passport from "passport";
import db from "../db/db.js";

function authenticate(req, res, next) {
  return passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/sign-in",
    failureMessage: true,
  })(req, res, next);
}

async function verifyUser(username, password, done) {
  try {
    const user = await db.getUserByUsername(username);

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/auth/sign-in");
}

export { verifyUser, isAuthenticated, authenticate };
